{
  let view = {
    el: 'main > .songList-container',
    template: `
      <div class="songList-title">歌曲列表</div>
      <div class="songListArea">
        <ul>
          <li data-songid="5b9913ec9f54540039a0ca13">
            <div class="songName">ルフィ猛攻!</div>
            <div class="singer">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-singer"></use>
              </svg>
              浜口史郎
            </div>
            <div class="link">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-link"></use>
              </svg>
              http://pdhlb0zh2.bkt.clouddn.com/%E6%B5%9C%E5%8F%A3%E5%8F%B2%E9%83%8E%20-%20%E3%83%AB%E3%83%95%E3%82%A3%E7%8C%9B%E6%94%BB!.mp3
            </div>
          </li>
          <li data-songid="5b9913f7808ca43cd20aeb5b">
            <div class="songName">Beautiful In White</div>
            <div class="singer">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-singer"></use>
              </svg>
              Westlife
            </div>
            <div class="link">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-link"></use>
              </svg>
              http://pdhlb0zh2.bkt.clouddn.com/Westlife%20-%20Beautiful%20In%20White%20(Demo).mp3
            </div>
          </li>
          <li data-songid="5b99141e1b69e6005b8b26a0">
            <div class="songName">莫失莫忘</div>
            <div class="singer">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-singer"></use>
              </svg>
              麦振鸿
            </div>
            <div class="link">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-link"></use>
              </svg>
              http://pdhlb0zh2.bkt.clouddn.com/%E9%BA%A6%E6%8C%AF%E9%B8%BF%20-%20%E8%8E%AB%E5%A4%B1%E8%8E%AB%E5%BF%98.mp3
            </div>
          </li>
          <li data-songid="5b991432fb4ffe005c98477e">
            <div class="songName">いのちの名前 ~ジブリ・メドレー~</div>
            <div class="singer">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-singer"></use>
              </svg>
              DJ SLY
            </div>
            <div class="link">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-link"></use>
              </svg>
              http://pdhlb0zh2.bkt.clouddn.com/DJ%20SLY%20-%20%E3%81%84%E3%81%AE%E3%81%A1%E3%81%AE%E5%90%8D%E5%89%8D%20~%E3%82%B7%E3%82%99%E3%83%95%E3%82%99%E3%83%AA%E3%83%BB%E3%83%A1%E3%83%88%E3%82%99%E3%83%AC%E3%83%BC~.mp3
            </div>
          </li>
        </ul>
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
