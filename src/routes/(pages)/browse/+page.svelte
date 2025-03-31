<script lang="ts">
    import { page } from '$app/state';

  </script>
  
  <div>
    Browsing for {page.url.searchParams.get('q') || 'all items'}
  </div>