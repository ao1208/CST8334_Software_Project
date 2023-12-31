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

namespace Google\Service\SecretManager;

class ReplicationStatus extends \Google\Model
{
  /**
   * @var AutomaticStatus
   */
  public $automatic;
  protected $automaticType = AutomaticStatus::class;
  protected $automaticDataType = '';
  /**
   * @var UserManagedStatus
   */
  public $userManaged;
  protected $userManagedType = UserManagedStatus::class;
  protected $userManagedDataType = '';

  /**
   * @param AutomaticStatus
   */
  public function setAutomatic(AutomaticStatus $automatic)
  {
    $this->automatic = $automatic;
  }
  /**
   * @return AutomaticStatus
   */
  public function getAutomatic()
  {
    return $this->automatic;
  }
  /**
   * @param UserManagedStatus
   */
  public function setUserManaged(UserManagedStatus $userManaged)
  {
    $this->userManaged = $userManaged;
  }
  /**
   * @return UserManagedStatus
   */
  public function getUserManaged()
  {
    return $this->userManaged;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(ReplicationStatus::class, 'Google_Service_SecretManager_ReplicationStatus');
