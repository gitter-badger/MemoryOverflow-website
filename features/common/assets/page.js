$(function() {
  'use strict';

  var _$el = {
        window: $(window),
        header: $('header'),
        city: $('.city')
      },
      _cityRules = {
        normalPosition: 1735,
        scrollSpeed: 0.4
      },
      _panelsVisibilityMargin = 160,
      _panels = [{
        selector: '.panel-game'
      }, {
        selector: '.panel-cards'
      }, {
        selector: '.panel-project'
      }];

  function _onScroll() {
    var windowHeight = _$el.window.height(),
        scrollTop = _$el.window.scrollTop(),
        scrollBottom = scrollTop + windowHeight,
        windowCenter = scrollTop + (windowHeight / 2);

    _$el.city.css('bottom', (_cityRules.normalPosition - scrollBottom) * _cityRules.scrollSpeed);

    $.each(_panels, function(index, panel) {
      var $panel = $(panel.selector),
          $hologramPanel = $panel.find('.hologram-panel'),
          panelMinCenter = panel.center - _panelsVisibilityMargin,
          panelMaxCenter = panel.center + _panelsVisibilityMargin,
          panelTopOffset = (Math.abs(windowCenter - panel.center) * 0.6);

      if(windowCenter > panel.center) {
        $panel.velocity({ translateY: -panelTopOffset }, { duration: 0 });
      }
      else if(windowCenter < panel.center) {
        $panel.velocity({ translateY: panelTopOffset }, { duration: 0 });
      }
      else {
        $panel.velocity({ translateY: 0 }, { duration: 0 });
      }

      if(panelMinCenter <= windowCenter && panelMaxCenter >= windowCenter) {
        if(!$hologramPanel.data('open')) {
          $hologramPanel.data('open', true);

          $hologramPanel
            .velocity('stop', true)
            .velocity({
              scale: [1, 0]
            }, {
              display: 'block',
              duration: 250,
              easing: 'linear'
            });
        }
      }
      else if($hologramPanel.data('open')) {
        $hologramPanel.data('open', false);

        $hologramPanel
          .velocity('stop', true)
          .velocity({
            scale: [0, 1]
          }, {
            display: 'none',
            duration: 150,
            easing: 'linear'
          });
      }
    });
  }

  function _init() {
    $.each(_panels, function(index, panel) {
      var $panel = $(panel.selector);

      $.extend(true, panel, {
        height: $panel.outerHeight(),
        top: $panel.position().top,
        center: $panel.offset().top + ($panel.outerHeight() / 2)
      });
    });

    _onScroll();
  }

  _init();

  _$el.window
    .scroll(_onScroll)
    .resize(_onScroll);

});