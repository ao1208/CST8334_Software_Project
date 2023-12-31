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

namespace Google\Service\Datastore;

class Entity extends \Google\Model
{
  /**
   * @var Key
   */
  public $key;
  protected $keyType = Key::class;
  protected $keyDataType = '';
  /**
   * @var Value[]
   */
  public $properties;
  protected $propertiesType = Value::class;
  protected $propertiesDataType = 'map';

  /**
   * @param Key
   */
  public function setKey(Key $key)
  {
    $this->key = $key;
  }
  /**
   * @return Key
   */
  public function getKey()
  {
    return $this->key;
  }
  /**
   * @param Value[]
   */
  public function setProperties($properties)
  {
    $this->properties = $properties;
  }
  /**
   * @return Value[]
   */
  public function getProperties()
  {
    return $this->properties;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(Entity::class, 'Google_Service_Datastore_Entity');
