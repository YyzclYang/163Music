{
  let view = {
    el: '#page-1-1',
    template: `
      <h2>推荐歌单</h2>
      <ol>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p2.music.126.net/RHbjHlvmCfoM_ABKNp7PQw==/109951163567915098.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">300万</span>
            </div>
            <p>华语速报新歌</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p2.music.126.net/DCAbjT2LYTmshb_Eam9Z5w==/109951163558350135.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">300万</span>
            </div>
            <p>人不如故 工作中听的华语歌单 生活方式的延续</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p2.music.126.net/RHbjHlvmCfoM_ABKNp7PQw==/109951163567915098.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">300万</span>
            </div>
            <p>华语速报新歌</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p2.music.126.net/DCAbjT2LYTmshb_Eam9Z5w==/109951163558350135.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">300万</span>
            </div>
            <p>人不如故 工作中听的华语歌单</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p2.music.126.net/RHbjHlvmCfoM_ABKNp7PQw==/109951163567915098.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">300万</span>
            </div>
            <p>华语速报新歌</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p2.music.126.net/DCAbjT2LYTmshb_Eam9Z5w==/109951163558350135.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">300万</span>
            </div>
            <p>人不如故 工作中听的华语歌单</p>
          </a>
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
