/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sale_event_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sale_event',
        key: 'id'
      }
    },
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    category_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'item'
  });

  return item;
};
