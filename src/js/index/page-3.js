{
  let view = {
    el: '#page-3',
    template: `
      <div class="search">
        <svg class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
        <input type="text" name="search">
        <label class="active">搜索歌曲、歌手、专辑</label>
        <svg class="icon icon-close" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
      <div class="hotSearch active">
        <h3>热门搜索</h3>
        <ul class="hotWords">
          <li class="hotWord">张杰</li>
          <li class="hotWord">凉生</li>
          <li class="hotWord">飘向北方</li>
          <li class="hotWord">不染</li>
          <li class="hotWord">国风极乐夜</li>
        </ul>
      </div>
      <div class="searchOptions">
        <div class="searchTitle"></div>
        <ul class="searchWords">
        </ul>
      </div>
      <div class="searchResult">
        <ul>
          <li>搜索结果</li>
        </ul>
      </div>
    `,
    render(data) {
      $(this.el).html(this.template);
    },
    renderSearchWord(data) {
      let { searchTitle, searchWords } = data;
      searchTitle = `搜索“${searchTitle}”`;
      $(this.el)
        .find('.searchTitle')
        .text(searchTitle);
      $(this.el)
        .find('ul.searchWords')
        .empty();
      let liDom = searchWords.map(word => {
        let $li = $(`
          <li class="searchWord">
            <svg class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-search"></use>
            </svg>
            <span>${word}</span>
          </li>
        `);
        return $li;
      });
      liDom.map(dom => {
        $(this.el)
          .find('ul.searchWords')
          .append(dom);
      });
    },
    renderSearchResult({ searchWord, songs }) {
      $(this.el)
        .find(`input[name=search]`)
        .val(searchWord);
      let liList = songs.map(song => {
        return $(`
            <li>
              <a href="./songPlay.html?id=${song.id}">
                <h3>
                  ${song.name}
                  <span>${song.minorName || ''}</span>
                </h3>
                <div class="singer">
                  <div class="sq"></div>
                  ${song.singer}
                </div>
                <svg class="icon playButton" aria-hidden="true">
                  <use xlink:href="#icon-play-button"></use>
                </svg>
              </a>
            </li>
          `);
      });
      $(this.el)
        .find('.searchResult > ul')
        .empty();
      liList.map(liDom => {
        $(this.el)
          .find('.searchResult > ul')
          .append(liDom);
      });
    }
  };
  let model = {
    data: {
      songs: [],
      searchOptions: {
        searchTitle: '',
        searchWords: ['One', 'Two', 'Three']
      }
    },
    find(data) {
      let query = new AV.Query('Song');
      return query.find().then(songs => {
        this.data.songs = songs.map(song => {
          return { id: song.id, ...song.attributes };
        });
        return songs;
      });
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
      //点击热词
      $('.hotWords').on('click', 'li', event => {
        window.eventHub.trigger('searching');
        let searchWord = event.target.innerText;
        this.model.data.searchOptions.searchTitle = searchWord;
        window.eventHub.trigger('searched', { searchWord });
      });
      //判断输入框的状态
      $('.search').on('input propertychange', () => {
        if ($(`input[name=search]`).val().length > 0) {
          this.model.data.searchOptions.searchTitle = $(
            `input[name=search]`
          ).val();
          window.eventHub.trigger('searching');
        } else {
          window.eventHub.trigger('clearSearch');
        }
      });
      //点击搜索框清除按钮
      $('.search > .icon').on('click', () => {
        window.eventHub.trigger('clearSearch');
      });
      //点击搜索提示词语
      $('.searchWords').on('click', 'li', event => {
        let searchWord = event.target.innerText;
        this.model.data.searchOptions.searchTitle = searchWord;
        window.eventHub.trigger('searched', { searchWord });
      });
      //点击搜索输入框，焦点聚集到搜索框
      $('input[name=search]').focus(() => {
        if ($(`input[name=search]`).val().length > 0) {
          window.eventHub.trigger('searching');
        }
      });
    },
    bindEventHub() {
      window.eventHub.on('searching', () => {
        $('.search').addClass('active');
        $('.hotSearch').removeClass('active');
        //设置搜索提示词
        $('.searchOptions').addClass('active');
        this.view.renderSearchWord(this.model.data.searchOptions);
        $('.searchResult').removeClass('active');
      });
      window.eventHub.on('clearSearch', () => {
        this.model.data.searchOptions.searchTitle = '';
        $(`input[name=search]`).val('');
        $('.search').removeClass('active');
        $('.hotSearch').addClass('active');
        $('.searchOptions').removeClass('active');
        $('.searchResult').removeClass('active');
      });
      window.eventHub.on('searched', ({ searchWord }) => {
        this.model.find().then(() => {
          $('.searchOptions').removeClass('active');
          $('.searchResult').addClass('active');
          this.view.renderSearchResult({
            searchWord,
            songs: this.model.data.songs
          });
        });
      });
    }
  };
  controller.init(view, model);
}
