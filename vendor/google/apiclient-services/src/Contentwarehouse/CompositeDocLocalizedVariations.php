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

namespace Google\Service\Contentwarehouse;

class CompositeDocLocalizedVariations extends \Google\Collection
{
  protected $collection_key = 'webmasterAlternateNames';
  /**
   * @var IndexingDupsComputedLocalizedAlternateNamesLocaleEntry[]
   */
  public $dupsComputedAlternateNames;
  protected $dupsComputedAlternateNamesType = IndexingDupsComputedLocalizedAlternateNamesLocaleEntry::class;
  protected $dupsComputedAlternateNamesDataType = 'array';
  /**
   * @var IndexingConverterLocalizedAlternateName[]
   */
  public $webmasterAlternateNames;
  protected $webmasterAlternateNamesType = IndexingConverterLocalizedAlternateName::class;
  protected $webmasterAlternateNamesDataType = 'array';

  /**
   * @param IndexingDupsComputedLocalizedAlternateNamesLocaleEntry[]
   */
  public function setDupsComputedAlternateNames($dupsComputedAlternateNames)
  {
    $this->dupsComputedAlternateNames = $dupsComputedAlternateNames;
  }
  /**
   * @return IndexingDupsComputedLocalizedAlternateNamesLocaleEntry[]
   */
  public function getDupsComputedAlternateNames()
  {
    return $this->dupsComputedAlternateNames;
  }
  /**
   * @param IndexingConverterLocalizedAlternateName[]
   */
  public function setWebmasterAlternateNames($webmasterAlternateNames)
  {
    $this->webmasterAlternateNames = $webmasterAlternateNames;
  }
  /**
   * @return IndexingConverterLocalizedAlternateName[]
   */
  public function getWebmasterAlternateNames()
  {
    return $this->webmasterAlternateNames;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(CompositeDocLocalizedVariations::class, 'Google_Service_Contentwarehouse_CompositeDocLocalizedVariations');
