{
  let view = {
    el: 'main > .songUpload-container',
    template: `
      <div class="upload-title">歌曲上传</div>
      <div id="uploadButtonWrapper">
        <button id="uploadButton">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-upload"></use>
            </svg>点击上传</span>
        </button>
      </div>
      <div class="uploadList">
        <div class="uploadListHead">
          <div>FileName</div>
          <div>Size</div>
          <div>Detail</div>
        </div>
        <div class="uploadListBody">
          <ul></ul>
        </div>
      </div>
    `,
    liTemplate: `
      <div class="uploadStatus active">
        <div class="progressWrapper">
          <span>上传中……</span>
          <div class="progressBar">
          </div>
        </div>
      </div>
      <div class="progressName"></div>
      <div class="progressFileSize"></div>
      <div class="progressDetail">
        <div class="fileDetail">
          <div class="singer">
            <strong>Singer:</strong>
            <span></span>
          </div>
          <div class="hash">
            <strong>Hash:</strong>
            <span></span>
          </div>
        </div>
      </div>
    `,
    render(data) {
      $(this.el).html(this.template);
    },
    find(selector) {
      return $(this.el).find(selector)[0];
    },
    update(songData) {
      $(`li[data-qiniuId = ${songData.qiniuId}]`)
        .find('.progressName')
        .text(songData.name);
    },
    activeItem(selector) {
      $(selector)
        .addClass('active')
        .siblings()
        .removeClass('active');
    },
    unactiveItem(selector) {
      $(selector).removeClass('active');
    },
    uploadListRender(song) {
      let liTemplate = this.liTemplate;
      let $li = $(
        `<li data-qiniuId="${song.qiniuId}" class="active">${liTemplate}</li>`
      );

      $li.find('.progressName').text(song.name);

      $(this.el)
        .find('ul')
        .append($li);
    },
    updateUpload(uploadInfo) {
      let uploadPercent = uploadInfo.percent;
      let size = Math.round(uploadInfo.size / 1024);
      let curSize = Math.round((size * uploadPercent) / 100);
      let sizeText;

      //更新文件大小
      if (size) {
        if (size > 1024) {
          sizeText = Math.round((size * 100) / 1024) / 100 + ' Mb';
        } else {
          sizeText = size + ' Kb';
        }
        $(`li[data-qiniuId = ${uploadInfo.qiniuId}] > .progressFileSize`).text(
          sizeText
        );
      }

      //更新进度条
      $(
        `li[data-qiniuId = ${uploadInfo.qiniuId}] .uploadStatus .progressBar `
      ).css('width', `${uploadPercent}%`);

      //更新文件信息
      if (uploadInfo.singer || uploadInfo.hash) {
        $(`li[data-qiniuId = ${uploadInfo.qiniuId}] .singer > span `).text(
          uploadInfo.singer || ''
        );
        $(`li[data-qiniuId = ${uploadInfo.qiniuId}] .hash > span `).text(
          uploadInfo.hash || ''
        );
      }
    }
  };
  let model = {};
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model.data);
      this.initQiniu();
      this.bindEvents();
      this.bindEventHub();
    },
    initQiniu() {
      //引入Plupload 、qiniu.js后
      var uploader = Qiniu.uploader({
        runtimes: 'html5', //上传模式,依次退化
        browse_button: this.view.find('#uploadButton'), //上传选择的点选按钮，**必需**
        uptoken_url: 'http://localhost:8888/uptoken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: 'pdhlb0zh2.bkt.clouddn.com', //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
        container: this.view.find('#uploadButtonWrapper'), //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '20mb', //最大文件体积限制
        dragdrop: true, //开启可拖曳上传
        drop_element: this.view.find('#uploadButtonWrapper'), //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
              // 文件添加进队列后,处理相关的事情
              let res = file.name;

              /* 歌曲文件名格式为 [歌手] - [歌名].格式 */
              let song = res.split('.');
              if (song.length > 2) {
                song.length--;
                song[0] = song.join('.');
                song.length = 1;
              }
              song = song[0].split(' - ');
              window.eventHub.trigger('uploadAdd', {
                qiniuId: file.id,
                name: song[1] || res,
                singer: song[0]
              });
            });
          },
          BeforeUpload: function(up, file) {
            // 每个文件上传前,处理相关的事情
          },
          UploadProgress: function(up, file) {
            // 每个文件上传时,处理相关的事情
            window.eventHub.trigger('uploading', {
              qiniuId: file.id,
              size: file.size,
              speed: file.speed,
              percent: file.percent
            });
          },
          FileUploaded: function(up, file, info) {
            // 每个文件上传成功后,处理相关的事情
            let res = JSON.parse(info.response);
            let domain = up.getOption('domain');
            let sourceLink =
              'http://' + domain + '/' + encodeURIComponent(res.key);
            console.log('上传完成');

            /* 歌曲文件名格式为 [歌手] - [歌名].格式 */
            let song = res.key.split('.');
            if (song.length > 2) {
              song.length--;
              song[0] = song.join('.');
              song.length = 1;
            }
            song = song[0].split(' - ');
            //给变更上传任务状态用
            window.eventHub.trigger('uploaded', {
              qiniuId: file.id,
              name: song[1] || res.key,
              singer: song[0],
              url: sourceLink,
              hash: res.hash
            });

            // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
            // var domain = up.getOption('domain');
            // var res = parseJSON(info.response);
            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
          },
          Error: function(up, err, errTip) {
            //上传出错时,处理相关的事情
          },
          UploadComplete: function() {
            //队列文件处理完毕后,处理相关的事情
          },
          Key: function(up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在 unique_names: false , save_key: false 时才生效

            var key = file.name;
            // do something with key here
            return key;
          }
        }
      });

      // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取

      // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
    },
    bindEvents() {},
    bindEventHub() {
      window.eventHub.on('uploadAdd', songData => {
        this.view.uploadListRender(songData);
        this.view.activeItem(`li[data-qiniuId = ${songData.qiniuId}]`);
      });
      window.eventHub.on('uploading', uploadInfo => {
        this.view.updateUpload(uploadInfo);
      });
      window.eventHub.on('uploaded', songData => {
        this.view.updateUpload(songData);
        this.view.unactiveItem(
          `li[data-qiniuId = ${songData.qiniuId}] > .uploadStatus`
        );
        window.eventHub.trigger('songEditActive', {});
        window.eventHub.trigger('songEdit', songData);
      });
      window.eventHub.on('songCreate', songData => {
        this.view.update(songData);
      });
    }
  };
  controller.init(view, model);
}
