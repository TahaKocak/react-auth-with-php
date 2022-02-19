<?php

class Auth {
    static private $key = 'my-first-svelte-app';
    static private $cipher = 'AES-128-CBC';

    static function encode($text) {
        $ivlen = openssl_cipher_iv_length(self::$cipher);
        $iv = openssl_random_pseudo_bytes($ivlen);
        $ciphertext_raw = openssl_encrypt($text, self::$cipher, self::$key, $options=OPENSSL_RAW_DATA, $iv);
        $hmac = hash_hmac('sha256', $ciphertext_raw, self::$key, $as_binary=true);
        return base64_encode( $iv.$hmac.$ciphertext_raw );
    }

    static function decode($ciphertext) {
        $c = base64_decode($ciphertext);
        $ivlen = openssl_cipher_iv_length(self::$cipher);
        $iv = substr($c, 0, $ivlen);
        $hmac = substr($c, $ivlen, $sha2len=32);
        $ciphertext_raw = substr($c, $ivlen+$sha2len);
        $original_plaintext = openssl_decrypt($ciphertext_raw, self::$cipher, self::$key, $options=OPENSSL_RAW_DATA, $iv);
        $calcmac = hash_hmac('sha256', $ciphertext_raw, self::$key, $as_binary=true);
        return ( hash_equals($hmac, $calcmac)) ? $original_plaintext : null;
    }
}