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

namespace Google\Service\Vision;

class AnnotateImageRequest extends \Google\Collection
{
  protected $collection_key = 'features';
  /**
   * @var Feature[]
   */
  public $features;
  protected $featuresType = Feature::class;
  protected $featuresDataType = 'array';
  /**
   * @var Image
   */
  public $image;
  protected $imageType = Image::class;
  protected $imageDataType = '';
  /**
   * @var ImageContext
   */
  public $imageContext;
  protected $imageContextType = ImageContext::class;
  protected $imageContextDataType = '';

  /**
   * @param Feature[]
   */
  public function setFeatures($features)
  {
    $this->features = $features;
  }
  /**
   * @return Feature[]
   */
  public function getFeatures()
  {
    return $this->features;
  }
  /**
   * @param Image
   */
  public function setImage(Image $image)
  {
    $this->image = $image;
  }
  /**
   * @return Image
   */
  public function getImage()
  {
    return $this->image;
  }
  /**
   * @param ImageContext
   */
  public function setImageContext(ImageContext $imageContext)
  {
    $this->imageContext = $imageContext;
  }
  /**
   * @return ImageContext
   */
  public function getImageContext()
  {
    return $this->imageContext;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(AnnotateImageRequest::class, 'Google_Service_Vision_AnnotateImageRequest');
