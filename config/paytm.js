module.exports = {
    'url'      :process.env.NODE_ENV === 'development' ? process.env.PAYTM_URL_DEV : process.env.PAYTM_URL_PRO,
    'channel'  :process.env.NODE_ENV === 'development' ? process.env.PATYM_CHANNEL_ID_DEV : process.env.PATYM_CHANNEL_ID_PRO,
    'mid'      : process.env.NODE_ENV === 'development' ? process.env.PAYTM_MID_DEV : process.env.PAYTM_MID_PRO,
    'key'      : process.env.NODE_ENV === 'development' ? process.env.PAYTM_KEY_DEV : process.env.PAYTM_KEY_PRO,
    'website'  : process.env.NODE_ENV === 'development' ? process.env.PATYM_WEB_NAME_DEV : process.env.PATYM_WEB_NAME_PRO,
    'industryID' : process.env.NODE_ENV === 'development' ? process.env.PATYM_INDUSTRY_ID_DEV : process.env.PATYM_INDUSTRY_ID_PRO,
};
