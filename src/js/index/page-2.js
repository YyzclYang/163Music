{
  let view = {
    el: '#page-2',
    template: `
      <div class="hotSongWrapper">
        <div class="hotSong">
          <div class="hotSongIcon"></div>
          <div class="updateTime">更新日期：__currentDate__</div>
        </div>
      </div>
      <div class="songList">
        <ul>
        </ul>
      </div>
      <div class="more">
        <span>查看完整榜单</span>
      </div>
    `,
    render(data) {
      function getCurrentDate() {
        let myDate = new Date();
        let mouth = myDate.getMonth() + 1;
        let day = myDate.getDate();
        if (mouth < 10) {
          mouth = '0' + mouth;
        }
        if (day < 10) {
          day = '0' + day;
        }
        return mouth + '月' + day + '日';
      }
      let template = this.template.replace('__currentDate__', getCurrentDate());

      $(this.el).html(template);
      let { songs } = data;
      let index = 0;
      let isActive;
      let number;
      let liList = songs.map(song => {
        if (index < 3) {
          isActive = 'active';
        } else {
          isActive = '';
        }
        if (++index < 10) {
          number = '0' + index;
        } else {
          number = index;
        }
        return $(`
          <li>
          <a href="./songPlay.html?id=${song.id}">
              <div class="number ${isActive}">${number}</div>
              <div class="songInfo">
                <div class="songName">
                  ${song.name}
                  <span>${song.minorName || ''}</span>
                </div>
                <div class="singer">
                  <div class="sq"></div>
                  ${song.singer}
                </div>
              </div>
              <svg class="icon playButton" aria-hidden="true">
                <use xlink:href="#icon-play-button"></use>
              </svg>
            </a>
          </li>
        `);
      });
      $(this.el)
        .find('ul')
        .empty();
      liList.map(liDom => {
        $(this.el)
          .find('ul')
          .append(liDom);
      });
    }
  };
  let model = {
    data: {
      songs: []
    },
    find(data) {
      let query = new AV.Query('Song');
      return query.find().then(songs => {
        this.data.songs = songs.map(song => {
          return { id: song.id, ...song.attributes };
        });
        return songs;
      });
    }
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.bindEvents();
      this.bindEventHub();
    },
    bindEvents() {
      this.model.find().then(() => {
        this.view.render(this.model.data);
      });
    },
    bindEventHub() {}
  };
  controller.init(view, model);
}
