{
  let view = {
    el: '#page-1-2',
    template: `
      <h2>最新音乐</h2>
        <ul>
        </ul>
    `,
    render(data) {
      $(this.el).html(this.template);
      let { songs } = data;
      let liList = songs.map(song => {
        return $(`
          <li>
            <a href="./songPlay.html?id=${song.id}">
              <h3>
                ${song.name}
                <span>${song.minorName || ''}</span>
              </h3>
              <div class="singer">
                <div class="sq"></div>
                ${song.singer}
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
