{
  let view = {
    el: 'main > .songEdit-container',
    template: `
      <div class="songEdit-title">
        <div>歌曲编辑</div>
      </div>
      <div class="songDetail">
        <form class="form">
          <div class="songTitle">
            <div class="songName">__name__</div>
            <button type="submit">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-save"></use>
              </svg>
              <span>保存</span>
            </button>
          </div>
          <div class="songInfo">
            <div class="row">
              <span>歌曲</span>
              <input name="name" type="text" value="__name__">
            </div>
            <div class="row">
              <span>歌手</span>
              <input name="singer" type="text" value="__singer__">
            </div>
            <div class="row">
              <span>链接</span>
              <input name="url" type="text" value="__url__">
            </div>
            <div class="row">
              <span>封面</span>
              <input name="cover" type="text" value="__cover__">
            </div>
            <div class="row">
              <span>歌词</span>
              <textarea name="lyrics">__lyrics__</textarea>
            </div>
          </div>
        </form>
      </div>
    `,
    render(data) {
      let songInfoReplace = ['name', 'singer', 'url', 'cover', 'lyrics'];
      let template = this.template;
      songInfoReplace.map(string => {
        let reg = new RegExp(`__${string}__`, 'g');
        template = template.replace(reg, data[string] || '');
      });

      $(this.el).html(template);
    }
  };
  let model = {
    data: {},
    create(songData) {
      // 声明类型
      var Song = AV.Object.extend('Song');
      // 新建对象
      var song = new Song();
      // 设置名称
      song.set('name', songData.name);
      song.set('singer', songData.singer);
      song.set('url', songData.url);
      song.set('cover', songData.cover);
      song.set('lyrics', songData.lyrics);
      // 设置优先级
      //song.set('priority', 1);
      return song.save().then(
        newSong => {
          let { id, attributes } = newSong;
          Object.assign(this.data, { id, ...attributes });
          //this.data = { id, ...attributes };
          alert('保存成功');
        },
        error => {
          console.error(error);
        }
      );
    },
    update(songData) {
      // 第一个参数是 className，第二个参数是 objectId
      var song = AV.Object.createWithoutData('Song', this.data.id);
      // 修改属性
      song.set('name', songData.name);
      song.set('singer', songData.singer);
      song.set('url', songData.url);
      song.set('cover', songData.cover);
      song.set('lyrics', songData.lyrics);
      // 保存到云端
      return song.save().then(response => {
        Object.assign(this.data, songData);
        return response;
      });
    }
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model.data);
      this.bindEvents();
      this.bindEventHub();
    },
    bindEvents() {
      $(this.view.el).on('submit', 'form', event => {
        event.preventDefault();
        if (this.model.data.id) {
          this.update();
        } else {
          this.create();
        }
      });
    },
    bindEventHub() {
      window.eventHub.on('songEdit', songData => {
        this.model.data = songData;
        this.view.render(this.model.data);
      });
      window.eventHub.on('uploadAdd', songData => {
        this.view.render(songData);
      });
    },
    create() {
      let songInfoNeed = ['name', 'singer', 'url', 'cover']; //+ lyrics
      let songData = {};
      songInfoNeed.map(keyWord => {
        songData[keyWord] = $(this.view.el)
          .find(`input[name="${keyWord}"]`)
          .val();
      });
      songData['lyrics'] = $(this.view.el)
        .find(`textarea[name="lyrics"]`)
        .val();
      this.model.create(songData).then(() => {
        $(this.view.el)
          .find('.songName')
          .text(this.model.data.name);
        window.eventHub.trigger('songCreate', this.model.data);
      });
    },
    update() {
      let songInfoNeed = ['name', 'singer', 'url', 'cover']; //+lyrics
      let songData = {};
      songInfoNeed.map(keyWord => {
        songData[keyWord] = $(this.view.el)
          .find(`input[name="${keyWord}"]`)
          .val();
      });
      songData['lyrics'] = $(this.view.el)
        .find(`textarea[name="lyrics"]`)
        .val();
      this.model.update(songData).then(() => {
        $(this.view.el)
          .find('.songName')
          .text(this.model.data.name);
        window.eventHub.trigger('songUpdate', this.model.data);
      });
    }
  };
  controller.init(view, model);
}
