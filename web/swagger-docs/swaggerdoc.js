api =
{
    loadSwaggerUi: function() {
        specFile = '../openapi.json';
        window.swaggerUi = new SwaggerUi({
            url: specFile,
            dom_id: "swagger-ui-container",
            validatorUrl: null,
            booleanValues: [0, 1],
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
            onFailure: function() {
                $('#message-bar').after('<div id="message-bar" class="swagger-ui-wrap message-fail" data-sw-translate="">' +
                    'The documentation could not be loaded</div>');
            },
            onComplete: function () {
                window.swaggerUi.api.setHost(window.location.hostname);
            },
            docExpansion: "list",
            apisSorter: "alpha",
            showRequestHeaders: false
        });

        window.swaggerUi.load();

        this.updatePartnerToken();
        this.updateMerchantToken();
    },

    initSwaggerUi: function() {
        // Pre load translate...
        if(window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
        }

        this.loadSwaggerUi();

        $('#input_partnerToken').change(this.updatePartnerToken);
        $('#input_merchantToken').change(this.updateMerchantToken);

        $("#swagger-ui-container").on('keydown', '.parameter', function(event) {
            //Submit forms on enter
            if (event.which == 13) {
                $(this).closest("form").submit();
                event.preventDefault();
            }
        });
    },

    updatePartnerToken: function() {
        //Include global partner token in all requests
        var partnerToken = $('#input_partnerToken')[0].value;

        if (partnerToken && partnerToken.trim() != '') {
            swaggerUi.api.clientAuthorizations.add(
                'partnerToken',
                new SwaggerClient.ApiKeyAuthorization('partner_token', partnerToken, 'query')
            );
        }
    },

    updateMerchantToken: function() {
        //Include merchant partner token in all requests
        var merchantToken = $('#input_merchantToken')[0].value;
        
        if (merchantToken && merchantToken.trim() != '') {
            swaggerUi.api.clientAuthorizations.add(
                'merchantToken',
                new SwaggerClient.ApiKeyAuthorization('token', merchantToken, 'query')
            );
        }
    }
};

jQuery(document).ready(jQuery.proxy(api.initSwaggerUi, api));
