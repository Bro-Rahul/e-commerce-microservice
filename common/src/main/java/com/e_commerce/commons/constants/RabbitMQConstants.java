package com.e_commerce.commons.constants;

public class RabbitMQConstants {

    public static final String CATALOG_EXCHANGE = "catalog";

    public static final String INVENTORY_EXCHANGE = "inventory";

    public static final String NOTIFICATION_EXCHANGE = "notification";

    public static final String SEARCH_EXCHANGE = "search";

    public static final String USER_EXCHANGE = "user";


    public static final String PRODUCT_QUEUE = "productQueue";

    public static final String PRODUCT_INDEX_QUEUE = "productIndexQueue";

    public static final String STOCK_QUEUE = "stockQueue";

    public static final String NOTIFICATION_QUEUE = "notificationQueue";


    public static final String CATALOG_DLX_ROUTING_KEY = CATALOG_EXCHANGE + ".dlx";

    public static final String INVENTORY_DLX_ROUTING_KEY = INVENTORY_EXCHANGE + ".dlx";

    public static final String SEARCH_DLX_ROUTING_KEY = SEARCH_EXCHANGE + ".dlx";

    public static final String USER_DLX_ROUTING_KEY = USER_EXCHANGE + ".dlx";

    public static final String NOTIFICATION_DLX_ROUTING_KEY = NOTIFICATION_EXCHANGE + ".dlx";

}