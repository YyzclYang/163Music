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
  let model = {
    data: { status: 'songUpload' },
    statusChange() {
      if (this.data.status === 'songUpload') {
        this.data.status = 'songList';
      } else {
        this.data.status = 'songUpload';
      }
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
      $('aside > .songUpload-selector').on('click', () => {
        if (this.model.data.status === 'songList') {
          $('aside > .songUpload-selector')
            .addClass('active')
            .siblings()
            .removeClass('active');
          this.model.statusChange();
        }
        window.eventHub.trigger('songUploadActive');
      });
      $('aside > .songList-selector').on('click', () => {
        if (this.model.data.status === 'songUpload') {
          $('aside > .songList-selector')
            .addClass('active')
            .siblings()
            .removeClass('active');
          this.model.statusChange();
          window.eventHub.trigger('songListActive');
        }
      });
    },
    bindEventHub() {
      window.eventHub.on('songEditActive', () => {
        $('aside').addClass('edit');
      });
      window.eventHub.on('songUploadActive', () => {
        $('aside').removeClass('edit');
      });
      window.eventHub.on('songListActive', () => {
        $('aside').removeClass('edit');
      });
    }
  };
  controller.init(view, model);
}
