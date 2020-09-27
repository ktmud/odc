# ODC Studios Official Website

Built with Gatsby and Wordpress.

## Fix ACF

Add this to `functions.php`:

```php
if (!function_exists('acf_nullify_empty')) {
    /**
     * Return `null` if an empty value is returned from ACF.
     *
     * @param mixed $value
     * @param mixed $post_id
     * @param array $field
     *
     * @return mixed
     */
    function acf_nullify_empty($value, $post_id, $field) {
        if (empty($value)) {
            return null;
        }
        return $value;
    }
}

add_filter('acf/format_value/type=image', 'acf_nullify_empty', 100, 3);
add_filter('acf/format_value/type=relationship', 'acf_nullify_empty', 100, 3);
add_filter('acf/format_value/type=gallery', 'acf_nullify_empty', 100, 3);
add_filter('acf/format_value/type=taxonomy', 'acf_nullify_empty', 100, 3);
```

## Build

1. Update base image:

   ```bash
   docker build -f base.Dockerfile -t ktmud/odc .
   docker publish ktmud/odc
   ```

2. Update Docker image hash in `Dockerfile`.
3. Commit and push.

