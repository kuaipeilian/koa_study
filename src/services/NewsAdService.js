const { NewsAd } = require('../models');

const createNewsAd = async params => NewsAd.create(params);
const deleteNewsAd = async id => NewsAd.destroy({ where: { id } });
const updateNewsAd = async (id, params) => NewsAd.update(params, { where: { id } });
const getNewsAdDetail = async id => NewsAd.findOne({ where: { id } });

const getNewsAdWithPosition = async (condition) => NewsAd.findAll({ where: { ...condition } });;

const getNewsAdList = async (condition) => {
    const size = condition.size || 10;
    const currentPage = condition.currentPage || 1;
    delete condition.size;
    delete condition.currentPage;
    return NewsAd.findAll({
        limit: size,
        order: [
            ['id'],
        ],
        offset: size * (currentPage - 1),
        attributes: ['id', 'name', 'imgUrl', 'status', 'position', 'client', 'url', 'createdAt', 'updatedAt'],
});
};
module.exports = {
    createNewsAd,
    deleteNewsAd,
    updateNewsAd,
    getNewsAdDetail,
    getNewsAdList,
    getNewsAdWithPosition,
};
