{
  let view = {
    el: 'aside',
    template: `
      <div class="songUpload-selector active">上传</div>
      <div class="songList-selector">曲库</div>
    `,
    render(data) {
      $(this.el).html(this.template);
    }
  };
  let model = {};
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model.data);
      this.bindEvents();
    },
    bindEvents() {}
  };
  controller.init(view, model);
}
