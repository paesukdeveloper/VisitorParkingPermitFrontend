  $(function () {
    // Sidebar links
    $('.sidebar .sidebar-menu li a').on('click', function () {
      const $this = $(this);
      if ($this.parent().hasClass('open')) {
        $this
          .parent()
          .children('.dropdown-menu')
          .slideUp(200, () => {
            $this.parent().removeClass('open');
          });
      } else {
        $this
          .parent()
          .parent()
          .children('li.open')
          .children('.dropdown-menu')
          .slideUp(200);
  
        $this
          .parent()
          .parent()
          .children('li.open')
          .children('a')
          .removeClass('open');
  
        $this
          .parent()
          .parent()
          .children('li.open')
          .removeClass('open');
  
        $this
          .parent()
          .children('.dropdown-menu')
          .slideDown(200, () => {
            $this.parent().addClass('open');
          });
      }
    });
  
    $('.offcanvas-toggle').click(function (e) {
      e.preventDefault();
      $('.offcanvas-menu').toggleClass('open');
    });
  
  
    $("#sidemenuId").hover(function (e) {
      $('#sidemenuId').toggleClass('hoverSidebar');
    })
  
    $("#sidemenuId").mouseleave(function (e) {
      if ($('body').hasClass('is-collapsed')) {
        $(".menuParent").removeClass("open");
        $(".menuChild").addClass("d-none");
      }
    })
  
    // ٍSidebar Toggle
    $('.sidebar-toggle').on('click', e => {
      $('.app').toggleClass('is-collapsed');
      $(".menuParent").removeClass("open");
        $(".menuChild").addClass("d-none");
      $('#toggleId').toggleClass('fa fa-angle-double-left fa fa-angle-double-right');
      e.preventDefault();
    });
  }());
  
  $(function () {
    $('.search-toggle').on('click', e => {
      $('.search-box, .search-input').toggleClass('active');
      $('.search-input input').focus();
      e.preventDefault();
    });
  }());