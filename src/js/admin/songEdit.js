{
  let view = {
    el: 'main > .songEdit-container',
    template: `
      <div class="songEdit-title">
        <div>歌曲编辑</div>
      </div>
      <div class="songDetail">
        <div class="songTitle">
          <div class="songName"></div>
          <button type="submit">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-save"></use>
            </svg>
            <span>保存</span>
          </button>
        </div>
        <form class="form">
          <div class="row">
            <span>歌曲</span>
            <input name="name" type="text" value="">
          </div>
          <div class="row">
            <span>歌手</span>
            <input name="singer" type="text" value="">
          </div>
          <div class="row">
            <span>链接</span>
            <input name="url" type="text" value="">
          </div>
          <div class="row">
            <span>封面</span>
            <input name="cover" type="text" value="">
          </div>
          <div class="row">
            <span>歌词</span>
            <textarea name="lyrics"></textarea>
          </div>
        </form>
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
