"""Exercise doctests for all of our modules."""

from doctest import testmod
import pkgutil
import importlib

import zero_ex


def test_all_doctests():
    """Gather zero_ex.* modules and doctest them."""
    for (_, modname, _) in pkgutil.walk_packages(
        path=zero_ex.__path__, prefix="zero_ex."
    ):
        module = importlib.import_module(modname)
        print(module)
        (failure_count, _) = testmod(module)
        assert failure_count == 0
