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
      this.bindEventHub();
    },
    bindEvents() {},
    bindEventHub() {
      window.eventHub.on('songUploadActive', () => {
        $('main > .songUpload-container')
          .addClass('active')
          .siblings()
          .removeClass('active');
      });
      window.eventHub.on('songListActive', () => {
        $('main > .songList-container')
          .addClass('active')
          .siblings()
          .removeClass('active');
      });
      window.eventHub.on('songEditActive', () => {
        $('main').addClass('edit');
      });
    }
  };
  controller.init(view, model);
}
