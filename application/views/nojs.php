<style>form{display:inline;}</style>

Studying
<form>
    <input type="submit" value="Start" />
    <input type="hidden" name="action_id" value="1" />
    <input type="hidden" name="type" value="start" />
</form>

<hr />

Running
<form>
    <input type="submit" value="Start" />
    <input type="hidden" name="action_id" value="2" />
    <input type="hidden" name="type" value="start" />
</form>

<hr />

Timer City
<?php if ($action == 'stop'): ?>
    <form>
        <input type="submit" value="Stop" />
        <input type="hidden" name="action_id" value="3" />
        <input type="hidden" name="type" value="stop" />
    </form>
    <form>
        <input type="submit" value="Cancel" />
        <input type="hidden" name="action_id" value="3" />
        <input type="hidden" name="type" value="cancel" />
    </form>
<?php else: ?>
    <form>
        <input type="submit" value="Start" />
        <input type="hidden" name="action_id" value="2" />
        <input type="hidden" name="type" value="start" />
    </form>
<?php endif; ?>