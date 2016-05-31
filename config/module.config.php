<?php
return array(
    'templates' => array(
        'themes' => array(
            'formation' => array(
                'label' => 'Formation',
                'basePath' => realpath(__DIR__ . '/../themes/formation'),
                'noBootstrap' => true,
                'css' => array(
                    '/css/bootstrap.min.css',
                ),
                'js' => array(
                    "/js/blockDefinitions.js"
                ),
                'img' => array(
                )
            ),
        )
    ),
    'blocksDefinition' => array(
        'carouselVideo' => array(
            'maxlifeTime' => 60,
            'definitionFile' => realpath(__DIR__ . "/blocks/") . '/carouselVideo.json'
        ),
        'geoSearchResults' => array(
            'maxlifeTime' => 60,
            'definitionFile' => realpath(__DIR__ . "/blocks/")  . '/geoSearchResults.json'
        ),
    )
);
