api =
{
    loadSwaggerUi: function() {
        window.swaggerUi = SwaggerUIBundle({
            url: '../openapi.json',
            dom_id: '#swagger-ui-container',
            validatorUrl: null,
            booleanValues: [0, 1],
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
            onFailure: function() {
                $('#message-bar').after('<div id="message-bar" class="swagger-ui-wrap message-fail" data-sw-translate="">' +
                    'The documentation could not be loaded</div>');
            },
            onComplete: function () {
                // Remove the useless scheme-container, no one uses http anymore
                $('.scheme-container').hide();
            },
            docExpansion: "list",
            apisSorter: "alpha",
            showRequestHeaders: false,
            presets: [
                SwaggerUIBundle.presets.apis,
            ],
            layout: "BaseLayout",
            defaultModelsExpandDepth: 0,
            requestInterceptor:function(request){
                const partnerToken = $('#input_partnerToken')[0].value;
                const merchantToken = $('#input_merchantToken')[0].value;

                if (partnerToken && '' !== partnerToken.trim()) {
                    request.url = request.url + '&partner_token=' + partnerToken;
                }

                if (merchantToken && '' !== merchantToken.trim()) {
                    request.url = request.url + '&token=' + merchantToken;
                }

                return request;
            }
        });
    },

    initSwaggerUi: function() {
        // Pre load translate...
        if(window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
        }

        this.loadSwaggerUi();

        $("#swagger-ui-container").on('keydown', '.parameter', function(event) {
            //Submit forms on enter
            if (event.which == 13) {
                $(this).closest("form").submit();
                event.preventDefault();
            }
        });
    },
};

jQuery(document).ready(jQuery.proxy(api.initSwaggerUi, api));
