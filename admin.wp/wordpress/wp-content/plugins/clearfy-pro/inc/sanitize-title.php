<?php

/**
 * Class Clearfy_Sanitize
 */
class Clearfy_Sanitize {

    /**
     * Clearfy_Sanitize constructor.
     */
    public function __construct() {
        add_filter( 'sanitize_title', array( $this, 'sanitize_title' ), 9 );
        add_filter( 'sanitize_file_name', array( $this, 'sanitize_file_name' ) );
    }


    /**
     * General sanitize
     *
     * @param $title
     *
     * @return mixed|string
     */
    public function sanitize( $title ) {

        $title = html_entity_decode( $title, ENT_QUOTES, 'utf-8' );
        $title = strtr( $title, $this->get_utf() );
        $title = trim( $title, '-' );
        $title = preg_replace( "/[^A-Za-z0-9-_.]/", '-', $title );
        $title = preg_replace( '~([=+.-])\\1+~' , '\\1', $title );

        if ( apply_filters( 'clearfy_transliteration_lower_title', true ) ) {
            $title = strtolower( $title );
        }

        return $title;

    }


    /**
     * Sanitize title
     *
     * @param $title
     *
     * @return mixed|string
     */
    public function sanitize_title( $title ) {

        if ( ! $title ) {
            return $title;
        }

        // if WC attribute -- return title
        if ( $this->is_wc_attribute( $title ) ) {
            return $title;
        }

        $title = $this->sanitize( $title );
        $title = str_replace('.', '-', $title);
        $title = preg_replace('/-{2,}/', '-', $title);


        return $title;
    }


    /**
     * Sanitize filename
     *
     * @param $title
     *
     * @return mixed|string
     */
    public function sanitize_file_name( $title ) {
        return $this->sanitize( $title );
    }


    /**
     * Check wc attribute
     */
    protected function is_wc_attribute( $title ) {

        // check wc activated
        if ( ! function_exists( 'wc_get_attribute_taxonomies' ) ) {
            return false;
        }

        $title = str_replace( 'pa_', '', $title );

        $attribute_taxonomies = wc_get_attribute_taxonomies();

        foreach ( $attribute_taxonomies as $attribute_taxonomy ) {
            if ( $attribute_taxonomy->attribute_name == $title ) {
                return true;
            }
        }

        return false;
    }



    public function sanitize_existing_slugs() {

        global $wpdb;

        $posts = $wpdb->get_results("SELECT ID, post_name FROM {$wpdb->posts} WHERE post_name REGEXP('[^A-Za-z0-9\-]+') AND post_status IN ('publish', 'future', 'private')");
        foreach ( (array) $posts as $post ) {
            $sanitized_name = $this->sanitize_title(urldecode($post->post_name));
            if ( $post->post_name != $sanitized_name && ! empty( $sanitized_name ) ) {
                add_post_meta($post->ID, '_wp_old_slug', $post->post_name);
                $wpdb->update($wpdb->posts, array( 'post_name' => $sanitized_name ), array( 'ID' => $post->ID ));
            }
        }

        $terms = $wpdb->get_results("SELECT term_id, slug FROM {$wpdb->terms} WHERE slug REGEXP('[^A-Za-z0-9\-]+') ");
        foreach ( (array) $terms as $term ) {
            $sanitized_slug = $this->sanitize_title(urldecode($term->slug));
            if ( $term->slug != $sanitized_slug && ! empty( $sanitized_slug ) ) {
                $wpdb->update($wpdb->terms, array( 'slug' => $sanitized_slug ), array( 'term_id' => $term->term_id ));
            }
        }

    }



    /**
     * Set utf
     */
    protected function get_utf() {

        $table = [
            '??' => 'Ae',
            '??' => 'ae',
            '??' => 'Ae',
            '??' => 'ae',
            '??' => 'A',
            '??' => 'a',
            '??' => 'A',
            '??' => 'a',
            '??' => 'A',
            '??' => 'a',
            '??' => 'A',
            '??' => 'a',
            '??' => 'A',
            '??' => 'a',
            '??' => 'a',
            '???' => 'a',
            '??' => 'a',
            '??' => 'C',
            '??' => 'c',
            '??' => 'C',
            '??' => 'c',
            '??' => 'D',
            '??' => 'd',
            '??' => 'E',
            '??' => 'e',
            '??' => 'E',
            '??' => 'e',
            '??' => 'E',
            '??' => 'e',
            '??' => 'E',
            '??' => 'e',
            '???' => 'e',
            '??' => 'f',
            '??' => 'g',
            '??' => 'G',
            '??' => 'I',
            '??' => 'i',
            '??' => 'I',
            '??' => 'i',
            '??' => 'I',
            '??' => 'i',
            '??' => 'Ii',
            '??' => 'ii',
            '??' => 'i',
            '??' => 'i',
            'I' => 'I',
            '??' => 'N',
            '??' => 'n',
            '???' => 'n',
            '??' => 'O',
            '??' => 'o',
            '??' => 'O',
            '??' => 'o',
            '??' => 'O',
            '??' => 'o',
            '??' => 'O',
            '??' => 'o',
            '??' => 'O',
            '??' => 'o',
            '???' => 'o',
            '??' => 'Oe',
            '??' => 'oe',
            '??' => 'Oe',
            '??' => 'oe',
            '??' => 'ss',
            '??' => 'S',
            '??' => 's',
            '??' => 's',
            '??' => 'S',
            '??' => 'U',
            '??' => 'u',
            '??' => 'U',
            '??' => 'u',
            '??' => 'U',
            '??' => 'u',
            '??' => 'Ue',
            '??' => 'ue',
            '??' => 'Y',
            '??' => 'y',
            '??' => 'y',
            '??' => 'Z',
            '??' => 'z',
            '???' => '0',
            '??' => '1',
            '??' => '2',
            '??' => '3',
            '???' => '4',
            '???' => '5',
            '???' => '6',
            '???' => '7',
            '???' => '8',
            '???' => '9' ,
            '???' => '0',
            '???' => '1',
            '???' => '2',
            '???' => '3',
            '???' => '4',
            '???' => '5',
            '???' => '6',
            '???' => '7',
            '???' => '8',
            '???' => '9',
            '??' => '-',
            '??' => 'x',
            '???' => '-',
            '???' => '=',
            '???' => '=',
            '???' => '-',
            '???' => '-',
            '???' => '-',
            '???' => '-',
            '???' => '-',
            '???' => '.',
            '???' => '..',
            '???' => '...',
            '???' => '.',
            '??' => '-',
            ' ' => '-',
            '??' => 'A',
            '??' => 'B',
            '??' => 'V',
            '??' => 'G',
            '??' => 'D',
            '??' => 'E',
            '??' => 'YO',
            '??' => 'ZH',
            '??' => 'Z',
            '??' => 'I',
            '??' => 'Y',
            '??' => 'K',
            '??' => 'L',
            '??' => 'M',
            '??' => 'N',
            '??' => 'O',
            '??' => 'P',
            '??' => 'R',
            '??' => 'S',
            '??' => 'T',
            '??' => 'U',
            '??' => 'F',
            '??' => 'H',
            '??' => 'TS',
            '??' => 'CH',
            '??' => 'SH',
            '??' => 'SCH',
            '??' => '',
            '??' => 'Y',
            '??' => '',
            '??' => 'E',
            '??' => 'YU',
            '??' => 'YA',
            '??' => 'a',
            '??' => 'b',
            '??' => 'v',
            '??' => 'g',
            '??' => 'd',
            '??' => 'e',
            '??' => 'yo',
            '??' => 'zh',
            '??' => 'z',
            '??' => 'i',
            '??' => 'y',
            '??' => 'k',
            '??' => 'l',
            '??' => 'm',
            '??' => 'n',
            '??' => 'o',
            '??' => 'p',
            '??' => 'r',
            '??' => 's',
            '??' => 't',
            '??' => 'u',
            '??' => 'f',
            '??' => 'h',
            '??' => 'ts',
            '??' => 'ch',
            '??' => 'sh',
            '??' => 'sch',
            '??' => '',
            '??' => 'y',
            '??' => '',
            '??' => 'e',
            '??' => 'yu',
            '??' => 'ya',

            // ukrainian
            '??' => 'i',
            '??' => 'i',
            '??' => 'i',
            '??' => 'i',
            '??' => 'e',
            '??' => 'e',
            '??' => 'g',
            '??' => 'g',

            // georgian
            '???' => 'a',
            '???' => 'b',
            '???' => 'g',
            '???' => 'd',
            '???' => 'e',
            '???' => 'v',
            '???' => 'z',
            '???' => 'th',
            '???' => 'i',
            '???' => 'k',
            '???' => 'l',
            '???' => 'm',
            '???' => 'n',
            '???' => 'o',
            '???' => 'p',
            '???' => 'zh',
            '???' => 'r',
            '???' => 's',
            '???' => 't',
            '???' => 'u',
            '???' => 'ph',
            '???' => 'q',
            '???' => 'gh',
            '???' => 'qh',
            '???' => 'sh',
            '???' => 'ch',
            '???' => 'ts',
            '???' => 'dz',
            '???' => 'ts',
            '???' => 'tch',
            '???' => 'kh',
            '???' => 'j',
            '???' => 'h',

            // tatar
            '??' => 'e',
            '??' => 'E',
            '??' => 'u',
            '??' => 'U',
            '??' => 'n',
            '??' => 'N',
            '??' => 'zh',
            '??' => 'ZH',
            '??' => 'o',
            '??' => 'O',
            '??' => 'h',
            '??' => 'H',

            // armenian
            '??' => 'ev',
            '????' => 'u',
            '??' => 'A',
            '??' => 'B',
            '??' => 'G',
            '??' => 'D',
            '??' => 'Ye',
            '??' => 'Z',
            '??' => 'E',
            '??' => 'Eh',
            '??' => 'Th',
            '??' => 'Zh',
            '??' => 'I',
            '??' => 'L',
            '??' => 'X',
            '??' => 'Tc',
            '??' => 'K',
            '??' => 'H',
            '??' => 'Dz',
            '??' => 'Gh',
            '??' => 'Tch',
            '??' => 'M',
            '??' => 'Y',
            '??' => 'N',
            '??' => 'Sh',
            '??' => 'Vo',
            '??' => 'Ch',
            '??' => 'P',
            '??' => 'J',
            '??' => 'R',
            '??' => 'S',
            '??' => 'V',
            '??' => 'T',
            '??' => 'R',
            '??' => 'C',
            '??' => 'Ph',
            '??' => 'Kh',
            '??' => 'O',
            '??' => 'F',
            '??' => 'a',
            '??' => 'b',
            '??' => 'g',
            '??' => 'd',
            '??' => 'e',
            '??' => 'z',
            '??' => 'e',
            '??' => 'eh',
            '??' => 'th',
            '??' => 'zh',
            '??' => 'i',
            '??' => 'l',
            '??' => 'x',
            '??' => 'tc',
            '??' => 'k',
            '??' => 'h',
            '??' => 'dz',
            '??' => 'gh',
            '??' => 'tch',
            '??' => 'm',
            '??' => 'y',
            '??' => 'n',
            '??' => 'sh',
            '??' => 'o',
            '??' => 'ch',
            '??' => 'p',
            '??' => 'j',
            '??' => 'r',
            '??' => 's',
            '??' => 'v',
            '??' => 't',
            '??' => 'r',
            '??' => 'c',
            '??' => 'ph',
            '??' => 'kh',
            '??' => 'o',
            '??' => 'f',

            // serbian
            "??" => "Dj",
            "??" => "J",
            "??" => "LJ",
            "??" => "NJ",
            "??" => "C",
            "??" => "Dz",
            "??" => "dj",
            "??" => "j",
            "??" => "lj",
            "??" => "nj",
            "??" => "c",
            "??" => "dz",

            // kazakh
            '??' => 'g',
            '??' => 'G',
            '??' => 'k',
            '??' => 'K',
            '??' => 'u',
            '??' => 'U',

            // other
            '??' => 'l',
            '??' => 'L',
            '??' => 'g',
            '??' => 'G',
        ];

        $locale = get_locale();

        // ukrainian
        if ( $locale == 'uk' || $locale == 'uk_ua' || $locale == 'uk_UA' ) {
            $table = array_merge( $table, [
                '??' => 'y',
                '??' => 'Y',
                '??' => 'h',
                '??' => 'H',
            ] );
        }

        // bulgarian
        if ( $locale == 'bg' || $locale == 'bg_bg' || $locale == 'bg_BG' ) {
            $table = array_merge( $table, [
                '??' => 'a',
                '??' => 'A',
                '??' => 'sht',
                '??' => 'SHT',
            ] );
        }

        // serbian
        if ( $locale == 'sr_RS' ) {
            $table = array_merge( $table, [
                "??" => "z",
                "??" => "Z",
                "??" => "c",
                "??" => "C",

                "????" => "Nja",
                "????" => "Nje",
                "????" => "Nji",
                "????" => "Njo",
                "????" => "Nju",
                "????" => "Lja",
                "????" => "Lje",
                "????" => "Lji",
                "????" => "Ljo",
                "????" => "Lju",
                "????" => "Dza",
                "????" => "Dze",
                "????" => "Dzi",
                "????" => "Dzo",
                "????" => "Dzu",
            ] );
        }

        $table = apply_filters( 'clearfy_transliteration_table', $table );

        return $table;

    }

}