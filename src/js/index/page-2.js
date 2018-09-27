{
  let view = {
    el: '#page-2',
    template: `
      <div class="hotSongWrapper">
        <div class="hotSong">
          <div class="hotSongIcon"></div>
          <div class="updateTime">更新日期：09月20日</div>
        </div>
      </div>
      <div class="songList">
        <ol>
          <li>
            <div class="number active">01</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number active">02</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number active">03</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number">04</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number">04</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number">04</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number">04</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number">04</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number">04</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
          <li>
            <div class="number">04</div>
            <div class="songInfo">
              <div class="songName">
                可不可以<span>说明</span>
              </div>
              <div class="singer">
                <div class="sq"></div>
                张紫豪 - 可不可以
              </div>
            </div>
            <svg class="icon playButton" aria-hidden="true">
              <use xlink:href="#icon-play-button"></use>
            </svg>
          </li>
        </ol>
      </div>
      <div class="more">
        <span>查看完整榜单 ></span>
      </div>
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
