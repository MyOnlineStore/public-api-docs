# Changelog

## 2022-08-09
* Added `uuid` field to the __Order__ object.
* Added `debtor_id` query parameter to the __getOrders__ endpoint.

## 2022-06-15
* Added deprecation flags to __Order__._payment_status_ and __Order__.__OrderPaymentSummary__ entity.

## [2.4.1] & [1.5.1] 2021-12-27
* Added `price.purchase` to __Article__ entity.

## [2.4] & [1.5] 2021-12-27
* Removed __Article__._tax_ rate that was deprecated in [2.3.1] and [1.4.1].
 This field has been replaced by a boolean __Article__.__taxable__ respectively.

## [2.3.4] & [1.4.4] 2021-07-01
* Added `taxable` to __Article__ entity.
* Added `is_main` to __getCategoryArticles__ endpoint.

## [2.3.3] & [1.4.3] 2021-05-25
* Added `uuid` to __Article__ entity.
* Added `uuids` query parameter to __getArticles__.

## [2.3.2] & [1.4.2] 2021-05-06
* Added __getCategoryArticles__ operation for retrieving available articles from a category.

## [2.3.1] & [1.4.1] 2021-04-19
* __Article__._tax_ is now deprecated. Expect this property to be removed in the future.

## [2.3] & [1.4] 2021-02-04
* Removed payment endpoints that were deprecated in [2.2.2] and [1.3.2].
* Removed __OrderPayment__ properties that were deprecated in [2.2.2] and [1.3.2].

## [2.2.6] & [1.3.6] 2021-02-04
* Added __postUploadImage__ operation for uploading and attaching an image to an article.

## [2.2.5] & [1.3.5] 2021-02-01
* __Article__._lists_._options_ are now required.

## [2.2.4] & [1.3.4] 2020-11-16

### Added
* Added `created_time` to __Article__ entity.
* Added `updated_time` to __Article__ entity.

## [2.2.3] & [1.3.3] 2020-11-11

### Changed
* all __Article__ and __Category__ will accept dateTime formatted time strings for the fields
 _created_start_date_, _created_end_date_, _changed_start_date_ and _changed_end_date_, date formatted strings are
 still supported but will be converted to dd-MM-YY 00:00:00 internally. Support for date format for these endpoints
 is now deprecated and will removed in the future.


## [2.2.2] & [1.3.2] 2020-10-27

### Added
* Added __getGateways__ and __getStoreGateways__ operations for retrieving available payment
 gateways and methods. These deprecate the __getPayTypes__ and __getPayTypesPerStore__ operations
  respectively, which will be removed on the 1st of February 2021.

### Changed
* __OrderPayment__._provider_ and __OrderPayment__._method_ are now deprecated and will be
 removed on the 1st of February 2021. These fields have been replaced with __OrderPayment__
 ._gateway_name_ and __OrderPayment__._method_name_ respectively.  

## [2.2.1] & [1.3.1] 2019-11-27

### Changed
* __Store__._avatar_url_ is now deprecated. Expect this property
  to be removed in the future.

## [2.2.0] & [1.3.0] 2019-11-08
    
### Changed
* For orders with no costs (__Order__._price_._total_ = '0.00') 
__Order__._payment_ is no longer guaranteed to be available, 
nor is __OrderPostable__._payment_ a required parameter     

## [2.1.1] & [1.2.1] 2019-09-19

### Added 
* __Order__._payment_status_: Indication of the payment status of the order, derived
from related payment transaction(s).
    
### Changed
* __Order__._payment_._status_ is now deprecated. Expect this property to be removed in the future.     

## [2.1.0] & [1.2.0] 2019-09-11

### Added 
* __Store__._available_business_models_: specifies which business models are available for orders
* __Order__._business_model_: specifies which business model has been applied to the order. 
Additional details can be found in the field documentation. Note that if this new feature is used for
 a __B2B__ order the __OrderDebtor__._address_._invoice_._company_ field is no longer optional
* __Order__._reference_: allows a business customer to specify a reference code. This field
is only available for orders _where business_model_ is `B2B` 
* __Order__._tax_strategy_: Reflects the tax strategy applied to an order. This field is read-only as 
the strategy is automatically determined. A detailed explanation about rules and effects can be found in the
new __Guides__ section  
    
### Changed
* __OrderDebtor__._address_._invoice_._taxnumber_ is no longer available as input for orders with business model `B2C`
* __OrderDebtor__._address_._invoice_._company_ is no longer available as input for orders if __Store__._version_ equals `GO`   
    
## [2.0.17] & [1.1.27]

### Added
* (2019-09-03) __Store__._id_ as a unique store identification (name is subject to change)
    
## [2.0.16] & [1.1.26]

### Added
* (2019-07-19) The purchase price of an ordered article has been added to the output. This may be an empty
string if the merchant has not specified a purchase price, or it was not available at the time of order placement

### Fixed
* (2019-07-17) Corrected CORS headers to allow API requests from any domain 

## [2.0.15] & [1.1.25]

### Added
* (2019-07-01) The list options attached to an article may now be a subset of the options available
in the __ArticleList__ entity. Each attached option can also specify a specific price to override the default.
When creating an __Article__ with the POST operation, each list must have at least one option specified.
When patching an __Article__, the _lists_._options_ specification is interpreted as a PUT operation: 
All specified options will be updated, any omitted options will be detached.
 
### Fixed
* (2019-07-02) Prices specified for options in __Article__._lists_ would always reflect the price
of the generic list option, rather than an overridden price for the specific article. 
This issue affected requests since the article specific list option feature release (2019-04-17).   

* (2019-07-01) List options in __Article__._lists_ were not correctly processed for POST operations, 
as no options would be attached for either operation. This issue affected requests since the article specific list 
option feature release (2019-04-17). Specified options will now be attached

* (2019-06-27) Data in __Article__._variants_ for PATCH and POST operations was erroneously ignored. 
This issue affected requests since 2019-05-03.

## [2.0.14] & [1.1.24] 2019-05-10

### Fixed 
* (2019-05-08) For discount details, __OrderDetail__._price_ would be a single object and have an empty value
 for _rate_. This has been corrected: because VAT for discount details is calculated by ratio 
of VAT percentages of affected articles, this should always be an array of __TaxPrice__ objects 
and contain an entry for all the relevant VAT percentages.        

* (2019-05-03) In some cases __Article__._variants_ would contain entries without any corresponding entries in
__Article__._lists_. These aberrant variants have been removed.

* (2019-04-26) When creating an order with a discounts that applies to specific articles only, 
prices for the relevant details and corresponding VAT amounts would not include the discount. 
This has been corrected

* (2019-04-24) Exposed __Order__._currency_locale_, which specifies the currency display locale at the time 
that the order was placed. Cannot be specified in POST, since it follows the current Store setting

* (2019-04-23) For some merchants, new article could not be created without a barcode, even if the
barcode field was not enabled by default. This is now possible again. 

## [2.0.13] & [1.1.23] 2019-04-12

### Added
* __TaxPrice__._amount_including_tax_ is now also available in the output of OrderDetail object. 
This will allow you to read the exact pre-calculated price including tax, rather than having to
apply a client side calculation and rounding      

* Exposed __Order__._currency_, which reflects the currency for which the order was placed. 
Cannot be specified in POST, where it follows the current Store setting

## [2.0.12] & [1.1.23] 2019-02-07

### Fixed
* Repaired an issue where _Order.price.tax_ reported incorrect data (double the actual tax amount). 
 This issue affected orders placed from 2019-01-23 in stores where Paypal and/or Afterpay 
 was available as payment provider (even if another payment method was used for the order itself).

## [2.0.11] & [1.1.22] 2018-12-12

### Added
* Optional property _amount_including_tax_ was added to the __TaxPrice__ object. 
This may be used for an __OrderDetailPostable__ object with _type = custom_, to specify
the _unit_price_ including tax. At least one of _amount_ or _amount_including_tax_ is required.    

## [2.0.10] & [1.1.21] 2018-11-28

### Added
* It is now possible to use an address ID from a registered customer when placing an order, instead of providing the
  complete address. The customers email _must_ match the email provided with the order.

## [2.0.9] & [1.1.20] 2018-11-28

### Added
* It is now possible to specify a price for an orderline with type "article". 
This will allow deviation from the article's "regular" price (as specified in the store). 
This functionality requires additional rights as partner. 
It can be used by specifying __OrderDetailPostable.price_override__. Note that this __must include VAT__ 

## [2.0.8] & [1.1.19] 2018-11-27

### Added
* Added `debtor.link_to_account` which allows to link an account to an order.

## [2.0.7] 2018-09-20

### Fixed
* Added correct validation error for invalid address specification in v2-beta

## [2.0.6] & [1.1.18] 2018-09-10

### Added
* It is now possible to attach images to a `ArticleConfiguratorListOption` when updating or creating an article.
  To add an image to an `ArticleConfiguratorListOption` add an `ArticleConfiguratorListPostable` object to `lists`.
  Within this object, set `has_images` to true and add an options array containing
  `ArticleConfiguratorListOptionPostable` objects. For each option you may add a `image_ids` array
   containing `ArticleImage` uuid's strings.
  
  Be aware when patching an article that `ConfiguratorArticleList.article_images` should be a complete set.
  It is interpreted like a PUT operation rather than PATCH
  
### Changed
* Adding a `ArticleConfiguratorList` by defining a integer in the `lists` array has been deprecated and
will be removed in version 2

## [2.0.5] & [1.1.17] 2018-09-07

### Fixed
* Since v1.1.14 __Article.lists.options.id__ was returned as string instead of the specified int.

## [2.0.4] & [1.1.16] 2018-09-06

### Fixed
* Since v1.1.14 __Article.lists.id__ was returned as string instead of the specified int. 

## [2.0.3] & [1.1.15] 2018-09-04

### Fixed
* Since v1.1.14 __Article.lists__ could be indexed incorrectly (not starting at 0). 

## [2.0.2] & [1.1.14] 2018-08-30

### Added
It is now possible in the backend to attach article images to a list option.

* Changed definition of __Article.lists__ to ConfiguratorArticleList
* Added id parameter to __ArticleImage__
* Added image_ids to __Article.lists.options__
* Added has_images to __Article.lists__

## [2.0.1] & [1.1.13] 2018-08-23

### Added
* It is possible to add custom items, which are not available in the article catalog,
to be added to an order. To add a custom article to an order, add an orderline with
the following fields:
```json
{
    "type": "custom",
    "quantity": 2,
    "description": "Omg I'm só special",
    "unit_price": {
        "amount": "8.9501",
        "rate": "21.00"
    },
    "unit_weight": "2.2"
}
```
Note that `type` must be `custom`, no `articles` field is needed, the price field
is called `unit_price` and the weight must be given via `unit_weight`.

## [2.0.0] 2018-07-10

### Added
* Released documentation for version 2-beta. Note that this version is still subject to change. 

## [1.1.12] 2018-06-22

### Fixed
* Fixed an issue where __Order.debtor.delivery.country_code__ 
 would be displayed incorrectly for some orders. This could occur in 
 stores which calculate equal shipping costs for all countries, for orders 
 where the invoice address was equal to the delivery address. 
 This country_code is now displayed correctly again. 

## [1.1.11] 2018-06-20

### Changed
* Improved resolving of country codes for addresses which
 do not have an explicit country code (version 1.0.6 and earlier).
 This process is now based on the order locale instead of the request locale.

## [1.1.10] 2018-06-06

### Added
* Added an `override_minimum` to the **postOrder** operation.
 This will allow you to ignore minimum order price limitations when creating and completing an order.
 Example use case: an offline purchase, so fulfillment costs do not apply. 
 Note: This option requires additional rights per partner.

## [1.1.9] 2018-06-06

### Added
* __CreditOrderPostable.offline_location_id__ has been added

## [1.1.8] 2018-06-06

### Fixed
* Fixed an issue where order-numbers would be assigned before validation.
Since an invalid order is never actually created, 
this would result in a non-sequential set of order-numbers. 

## [1.1.7] 2018-06-06

### Changed
* Changed type of __Order.credited_order_number__ and __Order.credit_order_numbers__
from string to integer, for consistency with __Order.number__ 

## [1.1.6] 2018-06-05

### Added
* The following fields have been added: 
  __Order.credited_order_number__, __Order.credit_order_numbers__

### Changed
* Performance of the __getOrders__ operation has been improved for larger limits.

## [1.1.5] 2018-06-01

### Fixed
* Values for __CreditOrderPostable.payment_costs__ 
and __CreditOrderPostable.shipping_costs__ were not processed,
resulting in the full payment costs and shipping costs to be credited.
This is now working as described again.

## [1.1.4] 2018-05-18

### Added
* It is now possible to attach images when creating or updating an article. To add
an image to an article, add an `images` object. The `images` object must be an array,
that for each image contains an `url` field: a string with the location of the desired
image; and a `position` field: an integer (1 - 15) marking the position of each image.

## [1.1.3] 2018-05-15

### Changed
* Phone number of offline locations is now returned in E164 format

## [1.1.2] 2018-05-14

### Fixed
* Fixed an issue where in some cases __Article.extra__ did not contain the
complete set of field values. This specifically concerned custom select fields
which apply to multiple articles. If the value for a specific article has been
removed from the field as an available option, it will now fallback to the
default or first available value 

## [1.1.1] 2018-05-04

### Added
* Added sorting information for categories. A category now contains a `sorting` object.
The sorting object contains:
  * `first` Whether it is the first in it's branch.
  * `last` Whether it is the last in it's branch.
  * `previous` Previous category in the branch, if any.
  * `next` Next category in the branch, if any.
* Added a __postCategory__ operation for the creation of categories.
It requires a `title`, and may contain `content`, `meta_title`, `parent_category_id`, `meta_content`, `hidden`, `article_order` and `sorting`.
The `sorting` object may contain one of:
  * `first` If the category should be the first in it's branch.
  * `last` If the category should be the last in it's branch.
  * `before` The ID of the category that the new created category should be in front of.
  * `after` The ID of the category that the new created category should be after.
* Added a __patchCategory__ operation for modification of categories.
It may contain any of the __postCategory__ operation fields.

## [1.1.0] 2018-03-21

### Fixed
* Incomplete orders (carts) are no longer available through any of the __Order__ operations.  
* The `finished` attribute has been removed from the __OrderPostable__ and __OrderPatchable__ 
objects, since it is overwritten during order processing anyway.     
* The `finished` attribute has been deprecated on the __Order__ object and will be removed in version 2.

## [1.0.8] 2018-02-26

### Fixed
* Fixed an issue were the ratelimit was not applied to partner AND store context,
but to partner context only. This was broken since 2018-02-12.

## [1.0.7] 2018-01-31

### Changed
* Added a `credit_order` property to the __OrderStatus__ object.
This specifies whether the status is allowed for (and signifies) a credit order. 

* Added a `mutate_stock` parameter to the __patchOrder__ operation. This parameter will only apply to credit orders.

### Added
* Added a __postCreditOrder__ operation, for the creation of credit orders. 
It requires an ordernumber (of the order which should be credited), 
a status (for the new credit order) and a set of orderlines. 
These must be a (sub)set of the orderlines of the original order. 
Stock mutation for credit orders is optional, and may be controlled by the `mutate_stock` parameter  

## [1.0.6] 2018-01-03
 
### Changed
* The following properties of __OrderDebtor__ have been deprecated and will be removed in version 2.
  The corresponding properties of __Address__ or __InvoiceAddress__ should be used instead.  

  * `gender`
  * `name`
  * `company`
  * `phone`
  * `bankaccount`

* A property `country_code` has been added to __Address__ and __InvoiceAddress__,
  which will accept an ISO 3166-1 alpha-2 code.
  The `country` property has been deprecated and will be removed in version 2.
  
* A property `shipping_method_id` has been added to __OrderPostable__. 
  This will be the new method to determine the shipping destination. 
  __Address__.`country_code` or __Address__.`country` will be used as fallback (in that order)
  if no `shipping_method_id` is specified

### Added

* A listing of available shipping methods has been added at `/v{version}/shipping/methods`

* Added an `override_stock` to **postOrder** and **patchOrder** operations.
 This will allow you to ignore stock limitations when creating and completing an order. Mutations are still applied.
 Example use case: an offline purchase of an article whose stock is not correctly synced.
 Additional access is required for this option.

## [1.0.5] 2017-11-01

### Added
* Added `default_language` to Store Model.
* Added `active_languages` to Store Model.

## [1.0.4] 2017-09-07
 
### Changed
* The format for NewsletterSubscriber parameters `created_start_date`, `created_end_date`, `changed_start_date` and
 `changed_end_date` has been changed to `yyyy-mm-dd hh:mm:ss` to allow filtering by time. 
 
  To ensure BC:
  - values in the format `yyyy-mm-dd` are accepted until version 2
  - `created_time` and `changed_time` values have been added to the NewsletterSubscriber object. These will be merged into `created_date` and `changed_date` in version 2.   

## [1.0.3] 2017-09-04
 
### Fixed
* Fixed an issue where PATCH or POST article actions which specified a barcode would produce an error    
* Fixed an issue where any article DELETE operation would produce an error

## [1.0.2] 2017-09-01
 
### Fixed
* Fixed an issue where article stock could no longer be set to unlimited. 
This is now also possible for variant stock. 

## [1.0.1] 2017-08-25 
 
### Fixed
* Fixed an issue where shipping costs would be applied for orders from an offline location

## [1.0.0] 2017-07-20 
 
### Fixed
* Fixed a bug where extra __articlefields__ were matched by their (translated) name only.
This would lead to mismatches with the default __weight__, __width__, __height__ and __length__ fields
