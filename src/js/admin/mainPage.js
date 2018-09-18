{
  let view = {
    el: 'main',
    template: `
      <div class="songList-container">
      </div>
      <div class="songUpload-container active"> 
      </div>
      <div class="songEdit-container">     
      </div>
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
