<?php

require_once __DIR__ . '/../config.php';

class ApiService
{
    public static function post($endpoint, $data = [])
    {
        return self::request('POST', $endpoint, $data);
    }

    public static function get($endpoint, $params = [])
    {
        if (!empty($params)) {
            $endpoint .= '?' . http_build_query($params);
        }
        return self::request('GET', $endpoint);
    }

    private static function request($method, $endpoint, $data = [])
    {
        $url = API_BASE_URL . $endpoint;
        $ch = curl_init($url);

        $headers = [
            'Accept: application/json',
            'Content-Type: application/json',
        ];

        if (!empty($_SESSION['auth_token'])) {
            $headers[] = 'Authorization: Bearer ' . $_SESSION['auth_token'];
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return [
            'status' => $httpCode,
            'data' => json_decode($response, true) ?: []
        ];
    }
}
