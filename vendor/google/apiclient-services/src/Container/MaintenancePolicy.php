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

namespace Google\Service\Container;

class MaintenancePolicy extends \Google\Model
{
  /**
   * @var string
   */
  public $resourceVersion;
  /**
   * @var MaintenanceWindow
   */
  public $window;
  protected $windowType = MaintenanceWindow::class;
  protected $windowDataType = '';

  /**
   * @param string
   */
  public function setResourceVersion($resourceVersion)
  {
    $this->resourceVersion = $resourceVersion;
  }
  /**
   * @return string
   */
  public function getResourceVersion()
  {
    return $this->resourceVersion;
  }
  /**
   * @param MaintenanceWindow
   */
  public function setWindow(MaintenanceWindow $window)
  {
    $this->window = $window;
  }
  /**
   * @return MaintenanceWindow
   */
  public function getWindow()
  {
    return $this->window;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(MaintenancePolicy::class, 'Google_Service_Container_MaintenancePolicy');
