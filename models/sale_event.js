/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var sale_event = sequelize.define('sale_event', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    useraccount_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_account',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'sale_event'
  });

  sale_event.associate = function(models) {
    //  When deleted, also delete any associated items
    sale_event.hasMany(models.item, {
      foreignKey: {
        name: 'sale_event_id',
        allowNull: false,
        onDelete: "cascade"
      }
    });
  };

  return sale_event;

};
