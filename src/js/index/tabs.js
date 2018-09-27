{
  let view = {
    el: '#tabs',
    template: `
      <ul class="tabsNav">
        <li class="active" data-tabName="page-1">
          <div class="text">
            <span>推荐音乐</span>
          </div>
        </li>
        <li data-tabName="page-2">
          <div class="text">
            <span>热歌榜</span>
          </div>
        </li>
        <li data-tabName="page-3">
          <div class="text">
            <span>搜索</span>
          </div>
        </li>
      </ul>
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
      this.view.render();
      this.bindEvents();
      this.bindEventHub();
    },
    bindEvents() {
      $(this.view.el).on('click', '.tabsNav > li', event => {
        $(event.currentTarget)
          .addClass('active')
          .siblings()
          .removeClass('active');
        let pageName = $(event.currentTarget).attr('data-tabName');
        window.eventHub.trigger('selectPage', pageName);
      });
    },
    bindEventHub() {}
  };
  controller.init(view, model);
}
