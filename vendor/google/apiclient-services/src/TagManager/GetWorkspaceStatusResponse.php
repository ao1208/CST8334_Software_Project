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

namespace Google\Service\TagManager;

class GetWorkspaceStatusResponse extends \Google\Collection
{
  protected $collection_key = 'workspaceChange';
  /**
   * @var MergeConflict[]
   */
  public $mergeConflict;
  protected $mergeConflictType = MergeConflict::class;
  protected $mergeConflictDataType = 'array';
  /**
   * @var Entity[]
   */
  public $workspaceChange;
  protected $workspaceChangeType = Entity::class;
  protected $workspaceChangeDataType = 'array';

  /**
   * @param MergeConflict[]
   */
  public function setMergeConflict($mergeConflict)
  {
    $this->mergeConflict = $mergeConflict;
  }
  /**
   * @return MergeConflict[]
   */
  public function getMergeConflict()
  {
    return $this->mergeConflict;
  }
  /**
   * @param Entity[]
   */
  public function setWorkspaceChange($workspaceChange)
  {
    $this->workspaceChange = $workspaceChange;
  }
  /**
   * @return Entity[]
   */
  public function getWorkspaceChange()
  {
    return $this->workspaceChange;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(GetWorkspaceStatusResponse::class, 'Google_Service_TagManager_GetWorkspaceStatusResponse');
