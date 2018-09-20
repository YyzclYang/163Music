{
  let view = {
    el: 'main > .songList-container',
    template: `
      <div class="songList-title">歌曲列表</div>
      <div class="songListArea">
        <ul>
        </ul>
      </div>
    `,
    render(data) {
      $(this.el).html(this.template);
      let { songs, selectedSongId } = data;
      let liList = songs.map(song => {
        let $li = $(`
          <li data-songId=${song.id}>
            <div class="songName">${song.name}</div>
            <div class="singer">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-singer"></use>
              </svg>
              ${song.singer}
            </div>
            <div class="link">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-link"></use>
              </svg>
              ${song.url}
            </div>
          </li>
          `);
        return $li;
      });
      $(this.el)
        .find('ul')
        .empty();
      liList.map(liDom => {
        $(this.el)
          .find('ul')
          .append(liDom);
      });
    },
    activeItem(selector) {
      $(selector)
        .addClass('active')
        .siblings()
        .removeClass('active');
    }
  };
  let model = {
    data: {
      songs: [],
      selectedSongId: undefined
    },
    find() {
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
      this.view.render(this.model.data);
      this.bindEvents();
      this.bindEventHub();
    },
    bindEvents() {
      $(this.view.el).on('click', 'li', event => {
        let songId = event.currentTarget.getAttribute('data-songId');
        this.selectSong(songId);
      });
    },
    bindEventHub() {
      window.eventHub.on('songListActive', () => {
        this.model.find().then(() => {
          this.view.render(this.model.data);
        });
      });
    },
    selectSong(songId) {
      this.view.activeItem(`li[data-songId="${songId}"]`);
      let songs = this.model.data.songs;
      let songData;
      for (let i = 0; i < songs.length; i++) {
        if (songId === songs[i].id) {
          songData = songs[i];
          break;
        }
      }

      let copySongData = JSON.parse(JSON.stringify(songData));
      window.eventHub.trigger('songEditActive', {});
      window.eventHub.trigger('songEdit', copySongData);
    }
  };
  controller.init(view, model);
}
