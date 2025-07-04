# Shopgate Connect - category-drawer

Adds a Burger Icon on the top left to open a Category Drawer. The Category Drawer slides in from the left side of the App.

## Important Information

- This extension only works with the iOS Theme.
- The `showSearchBarNavDrawer` needs the [@shopgate-project/persistent-search-bar](https://github.com/shopgate-professional-services/ext-persistent-search-bar) extension to be deployed.


#### categoryContentMap:
The configuration categoryContentMap will be used to determine which product tags or properties are used to denote the need for the associated content to be added NavDrawer
Example Value:
```json
{
  "categoryContentMap": [
     {
      "categoryId": "123",
      "content": "<img src=\"https://example.com/example.jpg\" />"
    },
    {
      "categoryId": "456",
      "content": "<a href=\"/category/383235\"><span>Jetzt Shoppen</span></a>"
    }
  ]
}
```

#### showTabBarBrowse:
This configuration is used to determine if the TabBarBrowse-Icon will be shown within the TabBar (iOS Theme) or not.
Default Values:
```json
{
  "showTabBarBrowse": true
}
```

#### showAppBarNavDrawer:
This configuration is used to determine if the NavDrawer Icon will be shown in the app header (only on homepage / startpage configured in the [@shopgate-project/page-switcher](https://github.com/shopgate-professional-services/ext-page-switcher)).
Default Values:
```json
{
  "showAppBarNavDrawer": false
}
```

#### showSearchBarNavDrawer:
This configuration is used to determine if the NavDrawer Icon will be shown in the persistent search bar.
Default Values:
```json
{
  "showSearchBarNavDrawer": true
}
```

#### showAllProducts:
This configuration is used to determine if the show all products function from the PWA will also be activated for the category drawer.
Default Values:
```json
{
  "showAllProducts": false
}
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
