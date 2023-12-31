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

namespace Google\Service\Script;

class EntryPoint extends \Google\Model
{
  /**
   * @var GoogleAppsScriptTypeAddOnEntryPoint
   */
  public $addOn;
  protected $addOnType = GoogleAppsScriptTypeAddOnEntryPoint::class;
  protected $addOnDataType = '';
  /**
   * @var string
   */
  public $entryPointType;
  /**
   * @var GoogleAppsScriptTypeExecutionApiEntryPoint
   */
  public $executionApi;
  protected $executionApiType = GoogleAppsScriptTypeExecutionApiEntryPoint::class;
  protected $executionApiDataType = '';
  /**
   * @var GoogleAppsScriptTypeWebAppEntryPoint
   */
  public $webApp;
  protected $webAppType = GoogleAppsScriptTypeWebAppEntryPoint::class;
  protected $webAppDataType = '';

  /**
   * @param GoogleAppsScriptTypeAddOnEntryPoint
   */
  public function setAddOn(GoogleAppsScriptTypeAddOnEntryPoint $addOn)
  {
    $this->addOn = $addOn;
  }
  /**
   * @return GoogleAppsScriptTypeAddOnEntryPoint
   */
  public function getAddOn()
  {
    return $this->addOn;
  }
  /**
   * @param string
   */
  public function setEntryPointType($entryPointType)
  {
    $this->entryPointType = $entryPointType;
  }
  /**
   * @return string
   */
  public function getEntryPointType()
  {
    return $this->entryPointType;
  }
  /**
   * @param GoogleAppsScriptTypeExecutionApiEntryPoint
   */
  public function setExecutionApi(GoogleAppsScriptTypeExecutionApiEntryPoint $executionApi)
  {
    $this->executionApi = $executionApi;
  }
  /**
   * @return GoogleAppsScriptTypeExecutionApiEntryPoint
   */
  public function getExecutionApi()
  {
    return $this->executionApi;
  }
  /**
   * @param GoogleAppsScriptTypeWebAppEntryPoint
   */
  public function setWebApp(GoogleAppsScriptTypeWebAppEntryPoint $webApp)
  {
    $this->webApp = $webApp;
  }
  /**
   * @return GoogleAppsScriptTypeWebAppEntryPoint
   */
  public function getWebApp()
  {
    return $this->webApp;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(EntryPoint::class, 'Google_Service_Script_EntryPoint');
