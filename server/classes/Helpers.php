<?php

class Helpers
{
    /**
     * @param $name
     * @return string
     */
    static function post($name) {
        return htmlspecialchars(strip_tags($_POST[$name]));
    }

    /**
     * @return string
     */
    static function getUrl() {
        $dirname = dirname($_SERVER['SCRIPT_NAME']);
        $dirname = $dirname != '/' ? $dirname : null;
        $basename = basename($_SERVER['SCRIPT_NAME']);
        return ltrim(str_replace([$dirname, $basename], null, $_SERVER['REQUEST_URI']),'/');
    }

    /**
     * @param $type
     * @param $text
     * @param $data
     * @return false|string
     */
    static function createResult($type,$text,$data = []) {
        return json_encode([
            'type' => $type,
            'text' => $text,
            'data' => $data
        ]);
    }
}