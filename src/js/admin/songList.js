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
        if (song.id === selectedSongId) {
          $li.addClass('active');
        }
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
     
    },
    bindEventHub() {
      window.eventHub.on('songListActive', () => {
        this.model.find().then(() => {
          this.view.render(this.model.data);
        });
      });
    },
  };
  controller.init(view, model);
}
