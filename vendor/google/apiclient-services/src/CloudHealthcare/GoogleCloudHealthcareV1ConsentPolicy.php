<?php
/*
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

namespace Google\Service\CloudHealthcare;

class GoogleCloudHealthcareV1ConsentPolicy extends \Google\Collection
{
  protected $collection_key = 'resourceAttributes';
  /**
   * @var Expr
   */
  public $authorizationRule;
  protected $authorizationRuleType = Expr::class;
  protected $authorizationRuleDataType = '';
  /**
   * @var Attribute[]
   */
  public $resourceAttributes;
  protected $resourceAttributesType = Attribute::class;
  protected $resourceAttributesDataType = 'array';

  /**
   * @param Expr
   */
  public function setAuthorizationRule(Expr $authorizationRule)
  {
    $this->authorizationRule = $authorizationRule;
  }
  /**
   * @return Expr
   */
  public function getAuthorizationRule()
  {
    return $this->authorizationRule;
  }
  /**
   * @param Attribute[]
   */
  public function setResourceAttributes($resourceAttributes)
  {
    $this->resourceAttributes = $resourceAttributes;
  }
  /**
   * @return Attribute[]
   */
  public function getResourceAttributes()
  {
    return $this->resourceAttributes;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(GoogleCloudHealthcareV1ConsentPolicy::class, 'Google_Service_CloudHealthcare_GoogleCloudHealthcareV1ConsentPolicy');
