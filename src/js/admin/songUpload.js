{
  let view = {
    el: 'main > .songUpload-container',
    template: `
      <div class="upload-title">歌曲上传</div>
      <div id="uploadButtonWrapper">
        <button id="uploadButton">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-upload"></use>
            </svg>点击上传</span>
        </button>
      </div>
      <div class="uploadList">
        <div class="uploadListHead">
          <div>FileName</div>
          <div>Size</div>
          <div>Detail</div>
        </div>
        <div class="uploadListBody">
          <ul></ul>
        </div>
      </div>
    `,
    liTemplate: `
      <div class="progressName"></div>
      <div class="progressFileSize"></div>
      <div class="progressDetail">
        <div class="uploadStatus">
          <div class="progressWrapper">
            <div class="progressBar">
            </div>
          </div>
          <div class="statusText"></div>
        </div>
        <div class="fileDetail">
          <div class="singer">
            <strong>Singer:</strong>
            <span></span>
          </div>
          <div class="hash">
            <strong>Hash:</strong>
            <span></span>
          </div>
        </div>
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
