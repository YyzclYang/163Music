{
  let view = {
    el: '#tabs',
    template: `
      <ol class="tabsNav">
        <li>
          <div class="text active">
            <span>推荐音乐</span>
          </div>
        </li>
        <li>
          <div class="text">
            <span>热歌榜</span>
          </div>
        </li>
        <li>
          <div class="text">
            <span>搜索</span>
          </div>
        </li>
      </ol>
    `,
    render(data) {
      $(this.el).html(this.template);
    }
  };
  let model = {
    data: []
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render();
      this.bindEvents();
      this.bindEventHub();
    },
    bindEvents() {},
    bindEventHub() {}
  };
  controller.init(view, model);
}
