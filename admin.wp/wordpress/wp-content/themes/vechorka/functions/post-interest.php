<?php
// добавляем запланированный хук
add_action('admin_head', 'post_interest_schedule');
function post_interest_schedule()
{
  if (!wp_next_scheduled('post_interest_event')) {
    wp_schedule_event(time(), 'hourly', 'post_interest_event');
  }
}

// добавляем функцию к указанному хуку
function do_post_interest()
{
  global $wpdb;
  $postids = $wpdb->get_results("SELECT ID FROM $wpdb->posts WHERE post_status='publish' AND post_type='post' ORDER BY ID ASC");

  foreach ($postids as $postid) {
    $postid = $postid->ID; // ID записи

    // считаем количество просмотров
    $views = (int)get_post_meta($postid, 'views', true);
    // считаем дни существования поста
    //$dtNow = get_the_time('U'); $dtTime = current_time('U'); $diff = $dtTime - $dtNow;
    $dtNow = get_post_time('U', true, $postid);
    $dtTime = current_time('U');
    $diff = $dtTime - $dtNow;

    // считаем комментарии и сумму просмотров с комментариями
    $comments = get_comments_number($postid);
    $sum = ($comments * 10) + $views;
    // считаем индекс популярности
    if ($days = '0') {
      $pop_index = $sum / 1;
    } else {
      $days = (int)$diff / 86400;
      $pop_index = $sum / $days;
    }
    $pop = round($pop_index, 2);
    // записываем индекс популярности в произвольное поле поста
    update_post_meta($postid, 'interest', $pop);
  }
}

add_action('post_interest_event', 'do_post_interest', 10, 2);