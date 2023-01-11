// import sequelize, { DataTypeUUIDv4 } from 'sequelize';
// import {  SMALLINT } from 'sequelize';
// import { Table, Model,  Column, HasMany, CreatedAt, UpdatedAt, DeletedAt, DataType } from 'sequelize-typescript';
// import { DataTypes, DoubleDataType, InferAttributes, InferCreationAttributes, Optional } from 'sequelize/types';

// type WalletAttributes = {
//   id: DataTypeUUIDv4;
//   User: string;
//   Balance: DoubleDataType
// }

// type WalletCreationAttributes = Optional<WalletAttributes, 'id'>;


// class Wallet extends Model<WalletAttributes, WalletCreationAttributes> {
//   static init(arg0: { id: { type: any;  primaryKey: boolean; }; User: { type: any; allowNull: boolean; }; Balance: { type: any}; createdAt: any; updatedAt: any; }, arg1: { sequelize: any; tableName: string; }) {
//     throw new Error('Method not implemented.');
//   }
//   declare id: DataTypeUUIDv4;
//   declare User: string;
//   declare Balance: DoubleDataType;


//   // @Column(DataType.TEXT)
//   // user: string;

//   // @CreatedAt
//   // creationDate: Date;

//   // @UpdatedAt
//   // updatedOn: Date;

//   // @DeletedAt
//   // deletionDate: Date;

//   // @HasMany(() => Hobby)
//   // hobbies: Hobby[];
// }

// class User extends Model<WalletAttributes>{
//   static init(arg0: { id: { type: any; autoIncrement: boolean; primaryKey: boolean; }; name: { type: any; allowNull: boolean; }; preferredName: { type: any; allowNull: boolean; }; createdAt: any; updatedAt: any; }, arg1: {
//     tableName: string; sequelize: any; // passing the `sequelize` instance is required
//   }) {
//     throw new Error('Method not implemented.');
//   }
// //// the user details


// }

// Wallet.init(
//   {
//     id: {
//       type: DataTypes.UUIDV4,
//       primaryKey: true
//     },
//     User: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     Balance: {
//       type: DataTypes.DOUBLE
//     }
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     tableName: 'projects'
//   }
// );


// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     preferredName: {
//       type: new DataTypes.STRING(128),
//       allowNull: true
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'users',
//     sequelize // passing the `sequelize` instance is required
//   }
// );


// /* eslint-disable linebreak-style */

// // module.exports = (sequelize: { define: (arg0: string, arg1: { id: { allowNull: boolean; primaryKey: boolean; defaultValue: any; type: any; }; Balance: { type: any; allowNull: boolean; }; UserId: { type: any; allowNull: boolean; };  CreatedAt: { type: any; defaultValue: () => number; allowNull: boolean; }; UpdatedAt: { type: any; defaultValue: () => number; allowNull: boolean; }; }, arg2: { freezeTableName: boolean; timestamps: boolean; }) => any; }, DataTypes: { UUIDV4: any; UUID: any; STRING: any; DATE: any; }) => {
// //     const Wallet = sequelize.define(
// //       "Wallets",
// //       {
// //         id: {
// //           allowNull: false,
// //           primaryKey: true,
// //           defaultValue: DataTypes.UUIDV4,
// //           type: DataTypes.UUID,
// //         },
// //         Balance: {
// //           type: DataTypes.STRING,
// //           allowNull: false,
// //         },
// //         UserId: {
// //           type: DataTypes.UUID,
// //           allowNull: false,
// //         },
// //         CreatedAt: {
// //           type: DataTypes.DATE,
// //           defaultValue: Date.now,
// //           allowNull: false,
// //         },
// //         UpdatedAt: {
// //           type: DataTypes.DATE,
// //           defaultValue: Date.now,
// //           allowNull: false,
// //         },
// //       },
// //       {
// //         freezeTableName: true,
// //         timestamps: false,
// //       }
// //     );
// //     Wallet.associate = (models: any) => {};
// //     return Wallet;
// //   };
  