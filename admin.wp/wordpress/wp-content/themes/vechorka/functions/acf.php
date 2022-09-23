<?php

// show YOAST settings panel in editor to bottom
add_filter( 'wpseo_metabox_prio', function() { return 'low'; } );


//acf admin styling
add_action('acf/input/admin_head', 'acf_admin_head');
function acf_admin_head()
{
  ?>
  <style type="text/css">
    /* .acf-flexible-content .layout {
      background: #dbe8f3;
    } */

    .acf-flexible-content .layout .acf-fc-layout-handle {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.4em;
      background: #3074b9;
    }

    .postbox-header {
      background: #23282e !important;
    }

    .postbox-header h2,
    .postbox-header h3 {
      color: #fff !important;
    }

    .postbox-header:hover h2,
    .postbox-header:hover h3 {
      color: #fff !important;
    }

    .postbox > .postbox-header .hndle:hover {
      color: #fff !important;
      background-color: #000000 !important;
    }

    .postbox > .postbox-header .hndle {
      font-size: 18px;
    }

    #editor .postbox .hndle {
      color: #fff !important;
    }

    #editor .postbox .handlediv .toggle-indicator:before,
    .postbox .handle-order-lower .order-lower-indicator::before {
      color: #fff !important;
    }

    .acf-field.acf-accordion .acf-label.acf-accordion-title {
      color: #fff;
      background-color: #55a4b3;
    }

    .acf-field.acf-accordion .acf-label.acf-accordion-title:hover {
      background-color: #2eb4ce;
    }

    .acf-accordion .acf-accordion-title label {
      font-size: 16px;
    }
  </style>
  <?php
}
