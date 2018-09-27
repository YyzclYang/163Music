{
  let view = {
    el: '#page-1-2',
    template: `
      <h2>最新音乐</h2>
        <ol>
          <li>
            <h3>ルフィ猛攻!</h3>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sq"></use>
              </svg>
              浜口史郎
            </p>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <h3>寂寞在唱歌</h3>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sq"></use>
              </svg>
              阿桑
            </p>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <h3>Рiчка</h3>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sq"></use>
              </svg>
              波丹.尤莉娅
            </p>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
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
