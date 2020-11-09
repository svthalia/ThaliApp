/**
 * API v1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: unknown
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The MemberList model module.
 * @module model/MemberList
 * @version unknown
 */
class MemberList {
  /**
   * Constructs a new <code>MemberList</code>.
   * @alias module:model/MemberList
   */
  constructor() {
    MemberList.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberList</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberList} obj Optional instance to populate.
   * @return {module:model/MemberList} The populated <code>MemberList</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberList();

      if (data.hasOwnProperty('pk')) {
        obj['pk'] = ApiClient.convertToType(data['pk'], 'Number');
      }
      if (data.hasOwnProperty('starting_year')) {
        obj['starting_year'] = ApiClient.convertToType(data['starting_year'], 'String');
      }
      if (data.hasOwnProperty('display_name')) {
        obj['display_name'] = ApiClient.convertToType(data['display_name'], 'String');
      }
      if (data.hasOwnProperty('membership_type')) {
        obj['membership_type'] = ApiClient.convertToType(
          data['membership_type'],
          'String'
        );
      }
      if (data.hasOwnProperty('avatar')) {
        obj['avatar'] = ApiClient.convertToType(data['avatar'], 'String');
      }
    }
    return obj;
  }
}

/**
 * @member {Number} pk
 */
MemberList.prototype['pk'] = undefined;

/**
 * @member {String} starting_year
 */
MemberList.prototype['starting_year'] = undefined;

/**
 * @member {String} display_name
 */
MemberList.prototype['display_name'] = undefined;

/**
 * @member {String} membership_type
 */
MemberList.prototype['membership_type'] = undefined;

/**
 * @member {String} avatar
 */
MemberList.prototype['avatar'] = undefined;

export default MemberList;
