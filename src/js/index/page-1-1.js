{
  let view = {
    el: '#page-1-1',
    template: `
      <h2>推荐歌单</h2>
      <ul>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p1.music.126.net/cuD-IKRDcot1VU2xu5VRog==/109951163598899281.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">207.5万</span>
            </div>
            <p>我不想当锦鲤，我只想我喜欢的人也喜欢我</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p1.music.126.net/3ngWSf4i6TlORIY6S0KSag==/109951163563901339.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">61.8万</span>
            </div>
            <p>威士忌风味·野性浪漫醇香度43%</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p1.music.126.net/1qqAYSpVWz72VdUB-kAvkw==/109951163210906121.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">227.1万</span>
            </div>
            <p>无法自拔 | 带感车载节奏</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p1.music.126.net/Op-a3I7Iy-amnSlzhVcWxw==/18814842976746273.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">369.9万</span>
            </div>
            <p>「高质量英文歌」让你单曲循环的英文歌</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p1.music.126.net/-u1N58MMFseqeNYLy9oDNQ==/109951163602869063.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">47.2万</span>
            </div>
            <p>Space Club</p>
          </a>
        </li>
        <li>
          <a href="">
            <div class="playListImg">
              <img src="http://p1.music.126.net/F14Wmijy4-PQ9gj2SZM_UA==/19112810625929217.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp"
                alt="">
              <span class="playCounts">31.9万</span>
            </div>
            <p>80000 （PRC 巴音汗 ）第一首就是改名了</p>
          </a>
        </li>
      </ul>
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
    bindEventHub() {}
  };
  controller.init(view, model);
}
