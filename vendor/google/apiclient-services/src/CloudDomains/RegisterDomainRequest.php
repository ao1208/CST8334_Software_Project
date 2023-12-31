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

namespace Google\Service\CloudDomains;

class RegisterDomainRequest extends \Google\Collection
{
  protected $collection_key = 'domainNotices';
  /**
   * @var string[]
   */
  public $contactNotices;
  /**
   * @var string[]
   */
  public $domainNotices;
  /**
   * @var Registration
   */
  public $registration;
  protected $registrationType = Registration::class;
  protected $registrationDataType = '';
  /**
   * @var bool
   */
  public $validateOnly;
  /**
   * @var Money
   */
  public $yearlyPrice;
  protected $yearlyPriceType = Money::class;
  protected $yearlyPriceDataType = '';

  /**
   * @param string[]
   */
  public function setContactNotices($contactNotices)
  {
    $this->contactNotices = $contactNotices;
  }
  /**
   * @return string[]
   */
  public function getContactNotices()
  {
    return $this->contactNotices;
  }
  /**
   * @param string[]
   */
  public function setDomainNotices($domainNotices)
  {
    $this->domainNotices = $domainNotices;
  }
  /**
   * @return string[]
   */
  public function getDomainNotices()
  {
    return $this->domainNotices;
  }
  /**
   * @param Registration
   */
  public function setRegistration(Registration $registration)
  {
    $this->registration = $registration;
  }
  /**
   * @return Registration
   */
  public function getRegistration()
  {
    return $this->registration;
  }
  /**
   * @param bool
   */
  public function setValidateOnly($validateOnly)
  {
    $this->validateOnly = $validateOnly;
  }
  /**
   * @return bool
   */
  public function getValidateOnly()
  {
    return $this->validateOnly;
  }
  /**
   * @param Money
   */
  public function setYearlyPrice(Money $yearlyPrice)
  {
    $this->yearlyPrice = $yearlyPrice;
  }
  /**
   * @return Money
   */
  public function getYearlyPrice()
  {
    return $this->yearlyPrice;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(RegisterDomainRequest::class, 'Google_Service_CloudDomains_RegisterDomainRequest');
