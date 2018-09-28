{
  let view = {
    el: '#page-3',
    template: `
      <div class="search">
        <svg class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
        <input type="search" name="search" class="search">
        <label>搜索歌曲、歌手、专辑</label>
        <svg class="icon icon-close" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
      <div class="hotSearch">
        <h3>热门搜索</h3>
        <ul class="hotWord">
          <li class="word">张杰</li>
          <li class="word">凉生</li>
          <li class="word">飘向北方</li>
          <li class="word">不染</li>
          <li class="word">国风极乐夜</li>
        </ul>
      </div>
    `,
    render(data) {
      $(this.el).html(this.template);
    }
  };
  let model = {
    data: {}
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model.data);
      this.bindEvents();
      this.bindEventHub();
    },
    bindEvents() {},
    bindEventHub() {}
  };
  controller.init(view, model);
}
