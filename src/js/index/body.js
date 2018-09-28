{
  let view = {
    el: '#m-body',
    template: `
      <div id="tabs" class="tabs">
      </div>
      <div class="pages">
        <div id="page-1" class="page page-1 active">
          <div id="page-1-1" class="page-1-1">     
          </div>
          <div id="page-1-2" class="page-1-2">
          </div>
          <div id="page-1-footer" class="page-1-footer">  
          </div>
        </div>
        <div id="page-2" class="page page-2 ">
        </div>
        <div id="page-3" class="page page-3">  
        </div>
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
    bindEventHub() {
      window.eventHub.on('selectPage', pageName => {
        $(this.view.el)
          .find(`#${pageName}`)
          .addClass('active')
          .siblings()
          .removeClass('active');
      });
    }
  };
  controller.init(view, model);
}
